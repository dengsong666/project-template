package com.example.base.exception;

import com.example.base.model.Result;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLException;
import java.util.List;
import java.util.Set;

@Slf4j
//@RestControllerAdvice
public class GlobalException {


    /**
     * 处理业务异常，自定义异常
     */
    @ExceptionHandler(BizException.class)
    public Result<?> bizExceptionHandler(BizException e) {
        log.error("自定义异常：{}", e.getMessage());
        return Result.fail(e.getCode(), e.getMessage());
    }

    /**
     * 处理空指针的异常
     */
    @ExceptionHandler(NullPointerException.class)
    public Result<?> nullPointExceptionHandler(NullPointerException e) {
        log.error("空指针异常：{}", e.getMessage());

        return Result.fail(e.getMessage());
    }

    /**
     * 处理请求参数异常
     */
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public Result<?> missingServletRequestParameterExceptionHandler(
            MissingServletRequestParameterException e) {
        return Result.fail(e.getParameterName() + "检查失败");
    }

    /**
     * form data 参数校验异常
     */
    @ExceptionHandler(BindException.class)
    public Result<?> bindExceptionHandler(BindException e) {
        log.error("form data参数校验异常：{}", e.getMessage());
        List<String> list =
                e.getAllErrors().stream()
                        .map(ObjectError::getDefaultMessage)
                        .toList();
        return Result.fail(list.toString());
    }

    /**
     * 单个参数校验异常
     */
    @ExceptionHandler(ConstraintViolationException.class)
    public Result<?> constraintViolationExceptionHandler(ConstraintViolationException e) {
        log.error("单个参数校验异常：{}", e.getMessage());
        List<String> list =
                e.getConstraintViolations().stream()
                        .map(ConstraintViolation::getMessage)
                        .toList();
        return Result.fail(list.toString());
    }

    /**
     * JSON参数校验异常
     */
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public Object methodArgumentNotValidException(MethodArgumentNotValidException ex) {
        log.error("json参数校验异常：{}", ex.getAllErrors());
        List<String> list =
                ex.getFieldErrors().stream()
                        .map(e -> e.getField() + e.getDefaultMessage())
                        .toList();

        return Result.fail(list.toString());
    }

    /**
     * 处理其他异常
     */
    @ExceptionHandler(Exception.class)
    public Result<?> exceptionHandler(Exception e) {
//        System.out.println(e);
        log.error("未知异常：{}", e.getMessage());
//        log.error(String.valueOf(e));
        return Result.fail(e.getMessage());
    }
}
