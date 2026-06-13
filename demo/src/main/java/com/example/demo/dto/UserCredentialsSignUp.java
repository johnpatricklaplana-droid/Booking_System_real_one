package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserCredentialsSignUp {
    private String email;
    private String password;
    private String first_name;
    private String last_name;
    private String firebase_uid;
    private String id_token;
}
