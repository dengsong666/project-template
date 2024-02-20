package com.example.controller;

import com.example.pojo.Result;
import com.example.pojo.User;
import com.example.service.UserService;
import com.example.utils.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@Tag(name = "用户")
public class UserController {
    @Autowired
    private UserService userService;

    @Operation(summary = "获取用户")
    @GetMapping("/list")
    public Result<List<User>> getUsers() {
        return Result.success(userService.list());
    }

    @Operation(summary = "登录")
    @PostMapping("/login")
    public Result<?> login(@Pattern(regexp = "^\\S{5,16}$") String username, String password) {
        User u = userService.login(username, password);
        if (u != null) {
            Map<String, Object> claims = new HashMap<>();
            claims.put("id", u.getId());
            claims.put("username", u.getUsername());

            return Result.success(JwtUtil.generate(claims));
        }
        return Result.error("用户名或密码错误");
    }

    @Operation(summary = "更新用户")
    @PutMapping
    public Result<?> update(@RequestBody @Validated User user){
        
        return Result.success();
    }


}
