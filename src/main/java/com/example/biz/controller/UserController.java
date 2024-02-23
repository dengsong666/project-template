package com.example.biz.controller;

import com.example.base.model.BaseEntity;
import com.example.base.model.PageRes;
import com.example.base.model.Result;
import com.example.biz.model.entity.User;
import com.example.biz.model.req.UserQuery;
import com.example.biz.model.res.UserRes;
import com.example.biz.service.IUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Tag(name = "用户")
public class UserController {

    private final IUserService userService;


    @Operation(summary = "用户登录")
    @PostMapping("/login")
    public Result<String> login(@RequestParam @Pattern(regexp = "^\\S{2,16}$", message = "用户名5-16位") String username, @RequestParam String password) {
        String token = userService.login(username, password);
        return Result.success(token);
    }

    @Operation(summary = "新增用户")
    @PostMapping("/register")
    @CachePut(cacheNames = "userCache", key = "#user.id")
    public Result<User> saveUser(@RequestBody User user) {
        userService.addUser(user);
        return Result.success(user);
    }


    @Operation(summary = "删除用户")
    @DeleteMapping("/{id}")
    @CacheEvict(cacheNames = "userCache", key = "#id")
    public Result<Boolean> deleteUser(@PathVariable Long id) {
        return Result.success(userService.removeById(id));
    }

    @Operation(summary = "更新用户")
    @PutMapping
    public Result<Boolean> updateUser(@Validated(BaseEntity.Update.class) @RequestBody User user) {
        return Result.success(userService.updateById(user));
    }

    @Operation(summary = "更新用户余额")
    @PutMapping("/{id}/deduction/{money}")
    public Result<ObjectUtils.Null> updateUserBalance(@Parameter(description = "用户id") @PathVariable Long id,@Min(0) @Parameter(description = "扣减金额") @PathVariable Integer money) {
        userService.deductBalance(id, money);
        return Result.success();
    }

    @Operation(summary = "批量更新用户余额")
    @PutMapping("/deduction")
    public Result<ObjectUtils.Null> updateUsersBalance(@Parameter(description = "用户id列表") @RequestParam List<Long> ids, @Min(0) @Parameter(description = "扣减金额") @RequestParam Integer money) {
        userService.deductBalances(ids, money);
        return Result.success();
    }

    @Operation(summary = "查询用户")
    @GetMapping("/{id}")
    @Cacheable(cacheNames = "userCache", key = "#id")
    public Result<User> queryUser(@PathVariable Long id) {
        User user = userService.getById(id);
        return Result.success(user);
    }

    @Operation(summary = "分页复杂条件查询用户")
    @GetMapping("/list")
    public Result<PageRes<UserRes>> queryUsers(UserQuery userQuery) {
        return Result.success(userService.queryUsers(userQuery));
    }

    @Operation(summary = "通过id查询用户以及地址")
    @GetMapping("/{id}/address")
    public Result<UserRes> queryUserAndAddressById(@PathVariable Long id) {
        return Result.success(userService.queryUserAndAddressById(id));
    }

    @Operation(summary = "批量通过id查询用户以及地址")
    @GetMapping("/list/address")
    public Result<List<UserRes>> queryUsersAndAddressById(@RequestParam List<Long> ids) {
        return Result.success(userService.queryUsersAndAddressById(ids));
    }


}
