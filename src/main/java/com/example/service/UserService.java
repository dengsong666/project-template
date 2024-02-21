package com.example.service;

import com.example.pojo.User;

import java.util.List;

public interface UserService {
    List<User> list();

    Long register(User user);

    String login(String username,String password);

    User getById(Long id);
}
