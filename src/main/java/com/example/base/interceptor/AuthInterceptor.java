package com.example.base.interceptor;


import com.example.constant.CommonConstant;
import com.example.base.model.Result;
import com.example.base.utils.JwtUtil;
import com.example.base.utils.ThreadLocalUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@Component
public class AuthInterceptor implements HandlerInterceptor {

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("拦截器 执行前");
        String token = request.getHeader(CommonConstant.TOENK_HEADER);
        String redisToken = redisTemplate.opsForValue().get(token);
        if (redisToken == null) return false;
        try {
            Claims claims = JwtUtil.parse(token);
            ThreadLocalUtil.set(claims);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            String noLogin = new ObjectMapper().writeValueAsString(Result.fail("NOT_LOGIN"));
            response.getWriter().write(noLogin);
            return false;
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        log.info("拦截器 执行后");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        ThreadLocalUtil.remove();
        log.info("拦截器 执行完毕");
    }
}
