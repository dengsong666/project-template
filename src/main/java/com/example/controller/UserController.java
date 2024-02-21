package com.example.controller;

import com.example.pojo.Result;
import com.example.pojo.User;
import com.example.service.UserService;
import com.example.utils.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Validated
@RestController
@RequestMapping("/user")
@Tag(name = "用户")
public class UserController {
    @Autowired
    private UserService userService;


    @Operation(summary = "获取用户")
    @GetMapping("/list")
    public Result<List<User>> getUsers(@RequestParam(required = false) List<String> ids) {
        return Result.success(userService.list());
    }

    @Operation(summary = "用户注册")
    @PostMapping("/register")
    @CachePut(cacheNames = "userCache",key = "#user.id")
    public Result<?> register(@RequestBody User user) {
        Long id =  userService.register(user);
        return Result.success(id);
    }

    @Operation(summary = "用户登录")
    @PostMapping("/login")
    public Result<?> login(@RequestParam @Pattern(regexp = "^\\S{2,16}$", message = "用户名5-16位") String username, @RequestParam String password) {
        String token = userService.login(username, password);
        return Result.success(token);
    }

    @Operation(summary = "更新用户")
    @PutMapping("/{id}")
    public Result<?> update(@RequestBody @Validated(User.Update.class) User user) {

        return Result.success();
    }

    @Operation(summary = "查找用户")
    @GetMapping("/{id}")
    @Cacheable(cacheNames = "userCache",key = "#id")
    public Result<?> query(@PathVariable Long id) {
        User user = userService.getById(id);
        return Result.success(user);
    }

}
