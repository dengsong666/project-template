package com.example.biz.service.impl;

import com.baomidou.mybatisplus.core.metadata.OrderItem;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.base.model.PageRes;
import com.example.biz.model.req.UserQuery;
import com.example.biz.model.req.UserReq;
import com.example.biz.model.res.UserRes;
import com.example.constant.MsgConstant;
import com.example.base.exception.BizException;
import com.example.biz.mapper.UserMapper;
import com.example.biz.model.entity.User;
import com.example.biz.service.UserService;
import com.example.base.utils.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private StringRedisTemplate redisTemplate;


    @Override
    public void register(User user) {
        user.setPassword(DigestUtils.md5DigestAsHex(user.getPassword().getBytes()));
        save(user);
    }

    @Override
    public String login(String username, String password) {
        String md5Password = DigestUtils.md5DigestAsHex(password.getBytes());
        log.info(md5Password);
        User u = userMapper.getByUsernameAndPassword(username);
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
    public PageRes<UserRes> queryUsers(UserQuery userQuery) {
        String username = userQuery.getUsername();
        Integer status = userQuery.getStatus();
        Date createTime = userQuery.getCreateTime();


        Page<User> page = Page.of(userQuery.getPageNum(), userQuery.getPageSize());
        page.addOrder(userQuery.getIsAsc() ? OrderItem.asc(userQuery.getSortBy()) : OrderItem.desc(userQuery.getSortBy()));
        return null;
    }

}
