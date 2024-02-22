package com.example.base.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum BizExceptionEnum{
    sys_0001(-1, "服务器繁忙，请稍后重试"),
    sys_0002(-2, "限流操作"),
    sys_0003(-3, "参数有误");

    private final int code;
    private final String msg;
}
