package com.example.biz.model.res;

import com.example.biz.model.entity.UserInfo;
import lombok.Data;

import java.util.List;

@Data
public class UserRes {
    private Long id;

    private String username;

    private Integer status;

    private UserInfo info;

    private List<AddressRes> address;
}
