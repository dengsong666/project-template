package com.example.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result<T> {
    private Integer code;
    private String msg;
    private T data;

    public static Result<?> success() {
        return new Result<>(0, "操作成功", null);
    }

    public static <D> Result<D> success(D data) {
        return new Result<>(0, "操作成功", data);
    }

    public static Result<?> error(String msg) {
        return new Result<>(1, msg, null);
    }

    public static Result<?> exception(HttpStatus code, String msg) {
        return new Result<>(code.value(), msg, null);
    }
}
