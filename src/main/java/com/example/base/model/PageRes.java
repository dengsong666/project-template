package com.example.base.model;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.base.utils.BeanUtil;
import lombok.Data;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Data
public class PageRes<T> {
    private Long total;
    private Long pageNum;
    private Long pageSize;
    private List<T> list;

    public static <PO, VO> PageRes<VO> of(Page<PO> p, Class<VO> voClass) {
        PageRes<VO> dto = new PageRes<>();
        dto.setTotal(p.getTotal());
        dto.setPageNum(p.getPages());
        dto.setPageSize(p.getSize());

        List<PO> records = p.getRecords();

        dto.setList(BeanUtil.copyPropertiesOfList(records, voClass));
        return dto;
    }

    public static <PO, VO> PageRes<VO> of(Page<PO> p, Function<PO,VO> convertor) {
        PageRes<VO> dto = new PageRes<>();
        dto.setTotal(p.getTotal());
        dto.setPageNum(p.getPages());
        dto.setPageSize(p.getSize());

        List<PO> records = p.getRecords();

        dto.setList(records.stream().map(convertor).collect(Collectors.toList()));
        return dto;
    }
}
