package com.example.biz.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.base.model.PageRes;
import com.example.biz.model.entity.User;
import com.example.biz.model.res.UserRes;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper //在运行时，会自动生成该按口的实现类对象（代理对象），并且将该对象交给IOC容器管理
public interface UserMapper extends BaseMapper<User> {
    @Insert("insert into user(username,password) values(#{username},#{password})")
    @Options(useGeneratedKeys = true,keyProperty = "id")
    void save(User user);

    @Select("select * from user where username=#{username}")
    User getByUsernameAndPassword(String username);

    @Select("select * from user where id=#{id}")
    User getById(Long id);

    @Delete("delete from user where id=#{id}")
    void deleteById(Long id);
}
