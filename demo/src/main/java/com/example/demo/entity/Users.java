package com.example.demo.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.DynamicInsert;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="users")
@Getter
@Setter
@DynamicInsert
public class Users {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private UUID id;

    @Column(name="first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "firebase_uid")
    private String firebaseUid;

    @Column(name="user_avatar")
    private String avatarUrl;

    @Column(name="email")
    private String email;

    @OneToMany(mappedBy = "userId", cascade = CascadeType.ALL)
    private List<Roles> roles;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "userId")
    private List<Business> businesses;

    @Column(name = "last_active_role")
    private String lastActiveRole;

}
