package com.example.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.URL;

@Data
public class User {
    @NotNull
    private Integer id;
    private String username;
    @NotEmpty
    private String nickname;
    @JsonIgnore
    private String password;
    private String name;
    private Integer age;
    @Email
    private String email;
    @URL
    private String avatar;
}
