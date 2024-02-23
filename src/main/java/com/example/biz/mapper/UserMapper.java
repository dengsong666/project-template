package com.example.biz.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.biz.model.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper //在运行时，会自动生成该按口的实现类对象（代理对象），并且将该对象交给IOC容器管理
public interface UserMapper extends BaseMapper<User> {

    @Select("select * from user where username=#{username}")
    User getByUsernameAndPassword(String username);

    @Update("update user set balance=balance-#{money} ${ew.customSqlSegment}")
    void deductBalances(@Param("ew") LambdaQueryWrapper<User> queryWrapper, Integer money);
}
