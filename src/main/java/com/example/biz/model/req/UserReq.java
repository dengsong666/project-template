package com.example.biz.model.req;

import com.example.base.model.PageReq;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class UserReq extends PageReq {
    private String username;
}
