package com.example.base.model;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Date;

/**
 * 实体父类
 *
 * @author wangjiao
 * @since 2020/11/13
 */
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public abstract class BaseEntity {

    @Schema(name = "主键")
    @TableId(type = IdType.AUTO)
    private Long id;

    @Schema(name = "创建时间")
    @TableField(fill = FieldFill.INSERT)
    private Date createTime;

    @Schema(name = "更新时间")
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Date updateTime;

    @Schema(name = "是否逻辑删除")
    private Boolean isDelete;

}
