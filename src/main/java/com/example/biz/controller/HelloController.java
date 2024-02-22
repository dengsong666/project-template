package com.example.biz.controller;

import com.example.base.model.Result;
import com.example.biz.model.entity.User;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@RestController
public class HelloController {
    //    无参
    @GetMapping("/hello")
    public Result<?> hello(){
        System.out.println("Hello Word");
        return Result.success();
    }
    //    简单参数
    @GetMapping("/param")
    public String param(String name,Integer age){
        System.out.println(name);
        return "OK";
    }
    //    实体参数
    @PostMapping("/pojoParam")
    public String pojoParam(User user){
        System.out.println(user);
        return "OK";
    }
    //    数组参数
    @GetMapping("/arrayParam")
    public String arrayParam(String[] hobby){
        System.out.println(Arrays.toString(hobby));
        return "OK";
    }
    //    集合参数
    @GetMapping("/listParam")
    public String listParam(@RequestParam List<String> hobby){
        System.out.println(hobby);
        return "OK";
    }
    //    时间参数
    @GetMapping("/datetimeParam")
    public String datetimeParam(@DateTimeFormat(pattern = "yyyy-dd-MM HH:mm:ss") LocalDateTime dateTime){
        System.out.println(dateTime);
        return "OK";
    }
    //    json参数
    @PostMapping("/jsonParam")
    public String jsonParam(@RequestBody User user){
        System.out.println(user);
        return "OK";
    }
    //    路径参数
    @GetMapping("/pathParam/{id}")
    public String pathParam(@PathVariable Integer id){
        System.out.println(id);
        return "OK";
    }




}
