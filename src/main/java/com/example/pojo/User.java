package com.example.pojo;

import com.example.validator.StateValidation;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.groups.Default;
import lombok.Data;
import org.hibernate.validator.constraints.URL;

@Data
public class User {

    @NotNull(groups = Add.class)
    private Integer id;

    private String username;

    @JsonIgnore
    private String password;
    //    @NotEmpty
//    @Size(max = 10)
//    private String nickname;

//    private String name;
//    private Integer age;
//    @Email
//    private String email;
//    @URL
//    private String avatar;

    public interface Add extends Default {

    }

    public interface Update extends Default {

    }
}
