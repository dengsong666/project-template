package com.example.base.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result<T> {
    private Integer code;
    private String msg;
    private T data;

    public static Result<ObjectUtils.Null> success() {
        return new Result<>(0, "操作成功", null);
    }

    public static <D> Result<D> success(D data) {
        return new Result<>(0, "操作成功", data);
    }

    public static Result<?> fail(String msg) {
        return new Result<>(1, msg, null);
    }

    public static Result<?> fail(Integer code, String msg) {
        return new Result<>(code, msg, null);
    }
}
