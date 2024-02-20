package com.example.interceptor;


import com.example.config.CommonConfig;
import com.example.pojo.Result;
import com.example.utils.JwtUtil;
import com.example.utils.ThreadLocalUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@Component
public class AuthInterceptor implements HandlerInterceptor {

    @Autowired
    private CommonConfig commonConfig;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("拦截器 执行前");
        String jwt = request.getHeader(commonConfig.getTokenHeader());
        try {
            Claims claims = JwtUtil.parse(jwt);
            ThreadLocalUtil.set(claims);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            String noLogin = new ObjectMapper().writeValueAsString(Result.error("NOT_LOGIN"));
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
