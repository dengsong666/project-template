package com.example.biz.enums;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.util.NumberUtils;

import java.util.Objects;

@Getter
@AllArgsConstructor
//@JsonFormat(shape = JsonFormat.Shape.NUMBER_INT)
public enum UserStatus {
    NORMAL(0, "正常"), Frozen(1, "冻结");

    @EnumValue
//    @JsonValue
    private final int value;
    private final String desc;



//    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
//    public static UserStatus fromNumber(String desc) {
//        System.out.println(45747);
//        for (UserStatus e : UserStatus.values()) {
//            if (Objects.equals(e.desc, desc)) {
//                return e;
//            }
//        }
//        return null;
//    }
}
