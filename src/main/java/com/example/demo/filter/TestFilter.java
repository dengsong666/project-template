package com.example.demo.filter;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;

import java.io.IOException;

@WebFilter(urlPatterns = "/*")
public class TestFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("过滤器 初始化...");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("过滤器 执行前...");
        filterChain.doFilter(servletRequest, servletResponse);
        System.out.println("过滤器 执行后...");
    }

    @Override
    public void destroy() {
        System.out.println("过滤器 销毁...");
    }
}
