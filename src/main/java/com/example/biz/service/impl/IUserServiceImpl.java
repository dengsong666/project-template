package com.example.biz.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.baomidou.mybatisplus.extension.toolkit.Db;
import com.example.base.model.PageRes;
import com.example.base.utils.BeanUtil;
import com.example.biz.model.entity.Address;
import com.example.biz.model.req.UserQuery;
import com.example.biz.model.res.AddressRes;
import com.example.biz.model.res.UserRes;
import com.example.constant.MsgConstant;
import com.example.base.exception.BizException;
import com.example.biz.mapper.UserMapper;
import com.example.biz.model.entity.User;
import com.example.biz.service.IUserService;
import com.example.base.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class IUserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {
    private final StringRedisTemplate redisTemplate;

    @Override
    public void addUser(User user) {
        save(user.setPassword(user.getPassword()));
    }

    @Override
    public String login(String username, String password) {
        String md5Password = DigestUtils.md5DigestAsHex(password.getBytes());
        log.info(md5Password);
        User u = baseMapper.getByUsernameAndPassword(username);
        if (u == null)
            throw new BizException(MsgConstant.ACCOUNT_NOT_FOUND);

        if (!md5Password.equals(u.getPassword())) throw new BizException(MsgConstant.PASSWORD_ERROR);
        Map<String, Object> claims = new HashMap<>();

        claims.put("id", u.getId());
        claims.put("username", u.getUsername());
        String token = JwtUtil.generate(claims);

        ValueOperations<String, String> operations = redisTemplate.opsForValue();
        operations.set(token, token, 12, TimeUnit.HOURS);

        return token;
    }

    @Override
    public PageRes<UserRes> queryUsers(UserQuery query) {
        String username = query.getUsername();
        Integer status = query.getStatus();
        Date createTime = query.getCreateTime();

        Page<User> page = query.mpPageSortByCreateTime(false);
        Page<User> p = lambdaQuery()
                .like(username != null, User::getUsername, username)
                .eq(status != null, User::getStatus, status)
                .page(page);
//        return PageRes.of(p, UserRes.class);
        return PageRes.of(p, user -> {
            UserRes res = BeanUtil.copyProperties(user, UserRes.class);
            res.setUsername(res.getUsername().substring(0, res.getUsername().length() - 2) + "**");
            return res;
        });
    }

    @Override
    public void deductBalance(Long id, Integer balance) {
        User user = getById(id);
        // 检查用户状态
        if (user == null || user.getStatus() == 1) {
            throw new RuntimeException("用户状态异常");
        }
        // 检查用户余额
        if (user.getBalance() < balance) {
            throw new RuntimeException("用户余额不足");
        }
        int remainBalance = user.getBalance() - balance;
        lambdaUpdate()
                .set(User::getBalance, remainBalance)
                .set(remainBalance == 0, User::getStatus, 1)
                .eq(User::getId, id)
                .eq(User::getBalance, user.getBalance()) // 乐观锁
                .update();
    }

    @Override
    public void deductBalances(List<Long> ids, Integer money) {
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<User>().in(User::getId, ids);
        baseMapper.deductBalances(queryWrapper, money);

    }

    @Override
    public UserRes queryUserAndAddressById(Long id) {
        User user = getById(id);
        if (user == null || user.getStatus() == 1) {
            throw new RuntimeException("用户状态异常");
        }
        List<Address> addresses = Db.lambdaQuery(Address.class).eq(Address::getUserId, id).list();

        UserRes userRes = BeanUtil.copyProperties(user, UserRes.class);

        userRes.setAddress(BeanUtil.copyPropertiesOfList(addresses, AddressRes.class));
        return userRes;
    }

    @Override
    public List<UserRes> queryUsersAndAddressById(List<Long> ids) {
        List<User> users = listByIds(ids);
        List<Long> userIds = users.stream().map(User::getId).toList();

        List<Address> addresses = Db.lambdaQuery(Address.class).in(Address::getUserId, userIds).list();

        List<AddressRes> addressResList = BeanUtil.copyPropertiesOfList(addresses, AddressRes.class);

        Map<Long, List<AddressRes>> addressMap = addressResList.stream().collect(Collectors.groupingBy(AddressRes::getUserId));

        return users.stream().map(u -> {
            UserRes userRes = BeanUtil.copyProperties(u, UserRes.class);
            userRes.setAddress(addressMap.get(u.getId()));
            return userRes;
        }).toList();
    }

}
