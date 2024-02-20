package com.example.aop;

import com.example.config.CommonConfig;
import com.example.mapper.OperateLogMapper;
import com.example.pojo.OperateLog;
import com.example.utils.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;

@Component
@Aspect
public class LogAop {
    @Autowired
    private HttpServletRequest request;

    @Autowired
    private OperateLogMapper operateLogMapper;

    @Autowired
    private CommonConfig commonConfig;

    @Around("execution(* com.example.service.*.save*(..)) execution(* com.example.service.*.del*(..)) execution(* com.example.service.*.up*(..))")
//    @Around("@annotation(com.example.aop.LogAnno)")
    public Object recordLog(ProceedingJoinPoint joinPoint) throws Throwable {
        Claims claims = JwtUtil.parse(request.getHeader(commonConfig.getTokenHeader()));
        // 操作人ID
        Integer operateUser = (Integer) claims.get("id");
        // 操作人用户名
        String operateUsername = (String) claims.get("username");
        // 操作时间
        LocalDateTime operateTime = LocalDateTime.now();
        // 操作类名
        String className = joinPoint.getTarget().getClass().getName();
        // 操作方法名
        String methodName = joinPoint.getSignature().getName();
        // 操作方法参数
        String methodParams = Arrays.toString(joinPoint.getArgs());

        long begin = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long end = System.currentTimeMillis();

        // 操作结果
        String returnValue = new ObjectMapper().writeValueAsString(result);
        // 操作耗时
        Long costTime = end - begin;

        OperateLog operateLog = new OperateLog(null, operateUser, operateTime, className, methodName, methodParams, returnValue, costTime);

        operateLogMapper.insert(operateLog);


        return result;

    }
}
