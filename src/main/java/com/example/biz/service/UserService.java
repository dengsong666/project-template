package com.example.biz.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.base.model.PageRes;
import com.example.biz.model.entity.User;
import com.example.biz.model.req.UserQuery;
import com.example.biz.model.req.UserReq;
import com.example.biz.model.res.UserRes;

import java.util.List;

public interface UserService extends IService<User> {
    void register(User user);

    String login(String username,String password);

    PageRes<UserRes> queryUsers(UserQuery userQuery);
}
