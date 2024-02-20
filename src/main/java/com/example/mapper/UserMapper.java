package com.example.mapper;

import com.example.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper //在运行时，会自动生成该按口的实现类对象（代理对象），并且将该对象交给IOC容器管理
public interface UserMapper {
    @Select("select * from user")
    List<User> list();

    @Select("select * from user where username=#{username} and password=#{password}")
    User getByUsernameAndPassword(String username,String password);
}