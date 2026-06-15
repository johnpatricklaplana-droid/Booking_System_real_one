package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.UserCredentialsSignUp;
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
        roles.add(r);
        user.setRoles(roles);

        userRepo.save(user);

    }

    public Users getUser (String uid) {

        Users user = userRepo.findByFirebaseUid(uid);
        
        return user;

    }

    public void uploadUserProfile(MultipartFile file) {
        
        String url = supabaseStorageService.uploadProfilePic(file);

        System.out.println(url);

    }

}
