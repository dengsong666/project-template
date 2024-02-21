package com.example.service.impl;

import com.example.constant.MsgConstant;
import com.example.exception.BizException;
import com.example.mapper.UserMapper;
import com.example.pojo.Result;
import com.example.pojo.User;
import com.example.service.UserService;
import com.example.utils.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private StringRedisTemplate redisTemplate;

    @Override
    public List<User> list() {
        return userMapper.list();
    }

    @Override
    public Long register(User user) {
        return userMapper.save(user);
    }

    @Override
    public String login(String username,String password) {
        String md5Password = DigestUtils.md5DigestAsHex(password.getBytes());
        log.info(md5Password);
        User u = userMapper.getByUsernameAndPassword(username);
        if(u==null)
            throw new BizException(MsgConstant.ACCOUNT_NOT_FOUND);

        if(!md5Password.equals(u.getPassword())) throw new BizException(MsgConstant.PASSWORD_ERROR);
        Map<String, Object> claims = new HashMap<>();

        claims.put("id", u.getId());
        claims.put("username", u.getUsername());
        String token = JwtUtil.generate(claims);

        ValueOperations<String, String> operations = redisTemplate.opsForValue();
        operations.set(token, token,12, TimeUnit.HOURS);

        return token;
    }

    @Override
    public User getById(Long id) {
        return userMapper.getById(id);
    }
}
