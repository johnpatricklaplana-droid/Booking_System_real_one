package com.example.demo.helper;

import java.time.Duration;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import com.example.demo.entity.Users;
import com.example.demo.service.UserService;

@Component
public class UserHelper {

    @Autowired
    UserService userService;
    
    public ResponseCookie createJwtCookie (String jwtToken) {
        return ResponseCookie.from("jwt-token", jwtToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(Duration.ofDays(7))
                .sameSite("Strict")
                .build();
    } 

    public List<String> extractUserRole (Users user) {

        return user.getRoles().stream()
            .map(u -> u.getRole())
            .toList();
    }

}
