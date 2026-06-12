package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.UserCredentialsDto;
import com.example.demo.entity.Roles;
import com.example.demo.entity.Users;
import com.example.demo.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public void createUser (UserCredentialsDto body) {

        String hashedPassword = passwordEncoder.encode(body.getPassword());

        Users user = new Users();
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        user.setEmail(body.getEmail());
        user.setPassword(hashedPassword);
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

}
