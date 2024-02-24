package com.example.biz.model.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import com.example.base.model.BaseEntity;
import com.example.constant.MsgConstant;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import org.springframework.util.DigestUtils;
import org.springframework.util.StringUtils;

@EqualsAndHashCode(callSuper = true)
@Data
@Accessors(chain = true)
@TableName(autoResultMap = true)
public class User extends BaseEntity {

    @Schema(description = "用户名")
    private String username;

    @Schema(description = "用户密码")
    @JsonIgnore
    private String password;

    @Schema(description = "手机号")
    @Pattern(regexp = "")
    private String phone;

    @Schema(description = "详细信息")
    @TableField(typeHandler = JacksonTypeHandler.class)
    private UserInfo info;

    @Schema(description = "状态")
    private Integer status;

    @Schema(description = "余额")
    @Min(0)
    private Integer balance;

    public User setPassword(String password) {
        String newPassword = StringUtils.hasText(password) ? password : MsgConstant.ACCOUNT_DEFAULT_PASSWORD;
        this.password = DigestUtils.md5DigestAsHex(newPassword.getBytes());
        return this;
    }

    //    // is开头的布尔值需要显式指定数据库字段名
//    @TableField("is_enabled")
//    private Boolean isEnable;

//    // 关键字需  要转义
//    @TableField("`order`")
//    private Integer order;

//    // 数据库不存在的字段
//    @TableField(exist = false)
//    private String address;

}
