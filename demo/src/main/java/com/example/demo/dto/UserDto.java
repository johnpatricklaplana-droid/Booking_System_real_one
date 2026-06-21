package com.example.demo.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDto {
    private String firstName;
    private String lastName;
    private String avatarUrl;
    private List<String> roles;
    private String email;
    private String lastActiveRole;
}
