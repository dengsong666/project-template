package com.example.base.exception;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BizException extends RuntimeException{
    private int code;
    private String msg;
    private Object[] errors;

    public BizException() {
        super();
    }

    public BizException(String msg) {
        super(msg);
    }

    public BizException(String msg, Throwable throwable) {
        super(msg, throwable);
    }

    public BizException( Integer code, String msg, Object... errors) {
        super(msg);
        this.code = code;
        this.errors = errors;
    }
}
