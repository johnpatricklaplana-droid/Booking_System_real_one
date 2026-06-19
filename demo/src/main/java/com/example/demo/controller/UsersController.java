package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.CreateBusinessRequestDto;
import com.example.demo.dto.SearchAddressDto;
import com.example.demo.dto.UserCredentialsSignUp;
import com.example.demo.dto.UserDto;
import com.example.demo.entity.Users;
import com.example.demo.helper.UserHelper;
import com.example.demo.service.JwtService;
import com.example.demo.service.UserService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;

import jakarta.servlet.http.HttpServletRequest;
import reactor.core.publisher.Mono;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
public class UsersController {

    @Autowired
    JwtService jwtService;

    @Autowired
    UserService userService;

    @Autowired 
    UserHelper userHelper;

    @PostMapping("/api/auth/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody UserCredentialsSignUp body) {

        String token = body.getId_token();

        try {
            FirebaseToken decoded = FirebaseAuth.getInstance().verifyIdToken(token);
    
            String jwtToken = jwtService.generateToken(decoded.getUid(), decoded.getEmail(), List.of("CUSTUMER"));

            userService.createUser(body);
           
            ResponseCookie cookie = userHelper.createJwtCookie(jwtToken);

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
    
    @PostMapping("/api/auth/login")
    public ResponseEntity<AuthResponse> login (HttpServletRequest request) {
        
        try {
            String bearerToken = request.getHeader("Authorization");

            if (bearerToken == null) {
                return ResponseEntity
                        .status(401)
                        .body(new AuthResponse(401, "unauthorized super request"));
            }

            String token = bearerToken.substring("Bearer".length()).trim();

            FirebaseToken decoded = FirebaseAuth.getInstance().verifyIdToken(token);

            Users user = userService.getUser(decoded.getUid());

            List<String> roles = userHelper.extractUserRole(user);

            String jwtToken = jwtService.generateToken(user.getId().toString(), decoded.getEmail(), roles);

            ResponseCookie cookie = userHelper.createJwtCookie(jwtToken);

            UserDto response = userHelper.toUserDto(user);

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(new AuthResponse(200, response));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new AuthResponse(500, "error happens for a reason"));
        }
    }

    @PostMapping("/api/user/profile")
    public ResponseEntity<AuthResponse> uploadProfilPic(@RequestParam MultipartFile file) {

        String url = userService.uploadUserProfile(file);
        
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new AuthResponse(201, url));
    }
    
    @GetMapping("/api/super-me")
    public ResponseEntity<AuthResponse> getUserInfo() {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new AuthResponse(200, userService.getUser()));
    }
    
    public ResponseEntity<?> createBusiness(@RequestBody CreateBusinessRequestDto business) {

        userService.createBusiness(business);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(null);
    }

    @GetMapping("/api/public/search-test/{query}")  
    public ResponseEntity<Mono<List<SearchAddressDto>>> searchAddress(@PathVariable String query) {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(userService.searchAddress(query));
    }

}
