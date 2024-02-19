package com.example.demo.exception;

import com.example.demo.pojo.Result;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;

@Slf4j
@RestControllerAdvice
public class GlobalException {

    // 参数格式异常处理
    @ExceptionHandler({IllegalArgumentException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Result<?> badRequestException(IllegalArgumentException ex) {
        log.error("参数格式不合法：{}", ex.getMessage());
        return Result.exception(HttpStatus.BAD_REQUEST, "参数格式不符！");
    }
    // 参数缺失异常处理
    @ExceptionHandler({MissingServletRequestParameterException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Result<?>badRequestException(Exception ex) {
        return Result.exception(HttpStatus.BAD_REQUEST, "缺少必填参数！");
    }
    // 权限不足异常处理
    @ExceptionHandler({AccessDeniedException.class})
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public Result<?> badRequestException(AccessDeniedException ex) {
        return Result.exception(HttpStatus.FORBIDDEN, ex.getMessage());
    }
    // 空指针异常
    @ExceptionHandler(NullPointerException.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public Result<?> handleTypeMismatchException(NullPointerException ex) {
        log.error("空指针异常，{}", ex.getMessage());
        return Result.exception(HttpStatus.INTERNAL_SERVER_ERROR, "空指针异常");
    }
    // 系统异常
    @ExceptionHandler(Throwable.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Result<?> exception(Throwable throwable) {
        log.error("未知异常", throwable);
        return Result.exception(HttpStatus.INTERNAL_SERVER_ERROR,"未知异常，请联系管理员");
    }
}
