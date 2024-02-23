package com.example.biz.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.base.model.PageRes;
import com.example.biz.model.entity.User;
import com.example.biz.model.req.UserQuery;
import com.example.biz.model.res.UserRes;

import java.util.List;

public interface IUserService extends IService<User> {
    String login(String username,String password);

    PageRes<UserRes> queryUsers(UserQuery userQuery);

    void addUser(User user);

    void deductBalance(Long id, Integer money);

    void deductBalances(List<Long> ids, Integer money);

    UserRes queryUserAndAddressById(Long id);

    List<UserRes> queryUsersAndAddressById(List<Long> ids);
}
