package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {
    
    private int status;
    private Object message;

    public AuthResponse(int status, Object message) {
        this.status = status;
        this.message = message;
    }

}
