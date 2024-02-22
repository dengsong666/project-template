package com.example.biz.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.example.base.model.BaseEntity;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.groups.Default;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class User extends BaseEntity {


    private String username;

    private String password;

    private Integer status;

//    // is开头的布尔值需要显式指定数据库字段名
//    @TableField("is_enabled")
//    private Boolean isEnable;

//    // 关键字需  要转义
//    @TableField("`order`")
//    private Integer order;

//    // 数据库不存在的字段
//    @TableField(exist = false)
//    private String address;


    public interface Add extends Default {

    }

    public interface Update extends Default {

    }
}
