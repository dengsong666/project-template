package com.example.base.interceptor;


import com.example.base.exception.BizException;
import com.example.constant.CommonConstant;
import com.example.base.model.Result;
import com.example.base.utils.JwtUtil;
import com.example.base.utils.ThreadLocalUtil;
import com.example.constant.MsgConstant;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
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
        // 令牌为空
        if (!StringUtils.hasText(token)) {
            throw new BizException(-1, MsgConstant.TOKEN_NOT_BLANK);
        }
        // 令牌过期
        String redisToken = redisTemplate.opsForValue().get(token);
        if (!StringUtils.hasText(redisToken)) {
            throw new BizException(-2, MsgConstant.TOKEN_HAVE_EXPIRED);
        }
        // 令牌非法
        try {
            Claims claims = JwtUtil.parse(token);
            ThreadLocalUtil.set(claims);
        } catch (Exception e) {
            throw new BizException(-3, MsgConstant.TOKEN_ILLEGAL);
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
