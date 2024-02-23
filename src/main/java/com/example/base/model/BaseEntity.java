package com.example.base.model;

import com.baomidou.mybatisplus.annotation.*;
import com.example.biz.model.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.groups.Default;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
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

    @Schema(description = "主键")
    @TableId(type = IdType.AUTO)
    @NotNull(groups = Update.class)
    private Long id;

    @Schema(description = "创建时间")
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @Schema(description = "更新时间")
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;

    @Schema(description = "是否逻辑删除")
    @TableLogic
    private Boolean isDelete;

    public interface Update extends Default {

    }

}
