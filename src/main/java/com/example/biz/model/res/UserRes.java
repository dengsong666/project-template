package com.example.biz.model.res;

import com.example.biz.enums.UserStatus;
import lombok.Data;

import java.util.List;

@Data
public class UserRes {
    private Long id;

    private String username;

    private Integer status;

    private List<AddressRes> address;
}
