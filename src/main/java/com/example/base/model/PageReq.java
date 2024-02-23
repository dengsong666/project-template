package com.example.base.model;

import com.baomidou.mybatisplus.core.metadata.OrderItem;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.biz.model.entity.User;
import lombok.Data;
import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.stream.Stream;

@Data
public class PageReq {

    private Long pageNum;
    private Long pageSize;
    private String sortBy;
    private Boolean isAsc = true;

    public <T> Page<T> mpPage(OrderItem... items) {
        Page<T> page = Page.of(pageNum, pageSize);
        if (StringUtils.hasText(sortBy)) {
            page.addOrder(new OrderItem().setColumn(sortBy).setAsc(isAsc));
        } else {
            page.addOrder(items);
        }
        return page;
    }

    public <T> Page<T> mpPage(String defaultSortBy, Boolean defaultIsAsc) {
        return mpPage(new OrderItem().setColumn(defaultSortBy).setAsc(defaultIsAsc));

    }

    public <T> Page<T> mpPageSortByCreateTime(Boolean defaultIsAsc) {
        return mpPage(new OrderItem().setColumn("create_time").setAsc(defaultIsAsc));
    }

    public <T> Page<T> mpPageSortByUpdateTime(Boolean defaultIsAsc) {
        return mpPage(new OrderItem().setColumn("update_time").setAsc(defaultIsAsc));
    }
}
