package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {
    
    private int status;
    private String message;

    public AuthResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

}
