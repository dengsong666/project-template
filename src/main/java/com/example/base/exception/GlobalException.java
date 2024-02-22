package com.example.base.exception;

import com.example.base.model.Result;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;

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
        return Result.fail(e.getMessage());
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
     * 处理 form data方式调用接口校验失败抛出的异常
     */
    @ExceptionHandler(BindException.class)
    public Result<?> bindExceptionHandler(BindException e) {
        List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();
        List<String> collect =
                fieldErrors.stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
        return Result.fail(BizExceptionEnum.sys_0003.getCode(), collect.toString());
    }

    /**
     * 处理单个参数校验失败抛出的异常
     */
    @ExceptionHandler(ConstraintViolationException.class)
    public Result<?> constraintViolationExceptionHandler(ConstraintViolationException e) {
        Set<ConstraintViolation<?>> constraintViolations = e.getConstraintViolations();
        List<String> collect =
                constraintViolations.stream()
                        .map(ConstraintViolation::getMessage)
                        .toList();
        return Result.fail(BizExceptionEnum.sys_0003.getCode(), collect.toString());
    }

    /**
     * 处理其他异常
     */
    @ExceptionHandler(RuntimeException.class)
    public Result<?> illegalArgumentExceptionHandler(RuntimeException e) {
        System.out.println(e);
        log.error("未：{}", e.getMessage());
        log.error(String.valueOf(e));
        return Result.fail(e.getMessage());
    }

    /**
     * 处理其他异常
     */
    @ExceptionHandler(Exception.class)
    public Result<?> exceptionHandler(Exception e) {
        System.out.println(e);
        log.error("未知异常：{}", e.getMessage());
        log.error(String.valueOf(e));
        return Result.fail(e.getMessage());
    }
}
