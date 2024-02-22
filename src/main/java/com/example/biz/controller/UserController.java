package com.example.biz.controller;

import com.example.base.model.PageRes;
import com.example.base.model.Result;
import com.example.biz.model.entity.User;
import com.example.biz.model.req.UserQuery;
import com.example.biz.model.req.UserReq;
import com.example.biz.model.res.UserRes;
import com.example.biz.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Tag(name = "用户")
public class UserController {

    private final UserService userService;




    @Operation(summary = "用户登录")
    @PostMapping("/login")
    public Result<String> login(@RequestParam @Pattern(regexp = "^\\S{2,16}$", message = "用户名5-16位") String username, @RequestParam String password) {
        String token = userService.login(username, password);
        return Result.success(token);
    }

    @Operation(summary = "用户注册")
    @PostMapping("/register")
    @CachePut(cacheNames = "userCache",key = "#user.id")
    public Result<User> register(@RequestBody User user) {
        BeanUtils.copyProperties(user,UserReq.class);
        userService.save(user);
        return Result.success(user);
    }



    @Operation(summary = "删除用户")
    @DeleteMapping("/{id}")
    @CacheEvict(cacheNames = "userCache",key = "#id")
    public Result<?> deleteUser(@PathVariable Long id) {
        userService.removeById(id);
        return Result.success(id);
    }

    @Operation(summary = "更新用户")
    @PutMapping("/{id}")
    public Result<?> updateUser(@RequestBody @Validated(User.Update.class) User user) {
//        userService.update(user);
        return Result.success();
    }

    @Operation(summary = "查询用户")
    @GetMapping("/{id}")
    @Cacheable(cacheNames = "userCache",key = "#id")
    public Result<?> queryUser(@PathVariable Long id) {
        User user = userService.getById(id);
        return Result.success(user);
    }

    @Operation(summary = "分页复杂条件查询用户")
    @GetMapping
    public Result<PageRes<UserRes>> queryUsers(UserQuery userQuery) {

        return Result.success(userService.queryUsers(userQuery));
    }


}
