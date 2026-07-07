package com.example.demo.dto.response;

import java.util.List;
import java.util.UUID;

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
    private UUID lastBusinessIdImViewing;
}
