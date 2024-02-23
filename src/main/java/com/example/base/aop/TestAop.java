package com.example.base.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@Aspect
public class TestAop {
    @Pointcut("execution(* com.example.biz.service.impl.IUserServiceImpl.*(..))")
//    @Pointcut("@annotation(com.example.aop.MyAop)")
    private void pt() {};
    @Before("pt()")
    public void before() {
        log.info("切面前...");
    }

    @Around("pt()")
    public Object around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        log.info("切面环绕前...");
        Object result = proceedingJoinPoint.proceed();
        log.info("切面环绕后...");
        return result;
    }

    @After("pt()")
    public void after() {
        log.info("切面后...");
    }

    @AfterReturning("pt()")
    public void afterReturn() {
        log.info("切面正常后...");
    }

    @AfterThrowing("pt()")
    public void afterThrow() {
        log.info("切面异常后...");
    }
}
