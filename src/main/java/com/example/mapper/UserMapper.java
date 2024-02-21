package com.example.mapper;

import com.example.pojo.User;
import io.swagger.v3.oas.annotations.Operation;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper //在运行时，会自动生成该按口的实现类对象（代理对象），并且将该对象交给IOC容器管理
public interface UserMapper {
    @Insert("insert into user(username) values(#{username})")
    @Options(useGeneratedKeys = true,keyProperty = "id")
    Long save(User user);

    @Select("select * from user")
    List<User> list();

    @Select("select * from user where username=#{username}")
    User getByUsernameAndPassword(String username);

    @Select("select * from user where id=#{id}")
    User getById(Long id);
}
