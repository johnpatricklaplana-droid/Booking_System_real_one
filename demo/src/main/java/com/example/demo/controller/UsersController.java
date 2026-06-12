package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.ErrorResponse;
import com.example.demo.dto.UserCredentialsDto;
import com.example.demo.service.JwtService;
import com.example.demo.service.UserService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class UsersController {

    @Autowired
    JwtService jwtService;

    @Autowired
    UserService userService;

    @PostMapping("/api/auth/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody UserCredentialsDto body) {

        String token = body.getId_token();

        try {
            FirebaseToken decoded = FirebaseAuth.getInstance().verifyIdToken(token);
    
            String jwtToken = jwtService.generateToken(decoded.getUid(), decoded.getEmail(), "CUSTOMER");

            userService.createUser(body);
           
            ResponseCookie cookie = ResponseCookie.from("jwt-token", jwtToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(Duration.ofDays(7))
                .sameSite("Strict")
                .build();

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(new AuthResponse(201, "created one success"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponse(500, "todo"));
        }

    }
    

}
