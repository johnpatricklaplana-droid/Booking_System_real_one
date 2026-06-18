package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.UserCredentialsSignUp;
import com.example.demo.dto.UserDto;
import com.example.demo.entity.Roles;
import com.example.demo.entity.Users;
import com.example.demo.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepo;

    @Autowired
    private SupabaseStorageService supabaseStorageService;
    
    public void createUser (UserCredentialsSignUp body) {   

        Users user = new Users();
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        user.setEmail(body.getEmail());
        user.setFirebaseUid(body.getFirebase_uid());
        user.setFirstName(body.getFirst_name());
        user.setLastName(body.getLast_name());

        List<Roles> roles = new ArrayList<>();
        Roles r = new Roles();
        r.setCratedAt(LocalDateTime.now());
        r.setRole("CUSTOMER");
        r.setUserId(user);
        roles.add(r);
        user.setRoles(roles);

        userRepo.save(user);

    }

    public Users getUser (String uid) {

        Users user = userRepo.findByFirebaseUid(uid);
        
        return user;

    }

    public String uploadUserProfile(MultipartFile file) {
        
        String url = supabaseStorageService.uploadProfilePic(file);

        try {
            String id = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            UUID userId = UUID.fromString(id);

            Users user = userRepo.findById(userId).orElse(null);
            user.setAvatarUrl(url);

            userRepo.save(user);

            return url;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    public UserDto getUser () {

        String id = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        UUID uid = UUID.fromString(id);

        Users user = userRepo.findById(uid).orElse(null);

        UserDto dto = new UserDto();
        dto.setAvatarUrl(user.getAvatarUrl());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setRoles(user.getRoles().stream().map(r -> r.getRole()).toList());

        return dto;

    }

}
