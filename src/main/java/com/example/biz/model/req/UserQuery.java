package com.example.biz.model.req;

import com.example.base.model.PageReq;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
public class UserQuery extends PageReq {
    private String username;

    private Integer status;

    private Date createTime;
}
