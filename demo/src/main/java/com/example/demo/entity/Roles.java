package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="roles")
@Setter
@Getter
public class Roles {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private String id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private Users userId; 

    @Column(name = "role")
    private String role;

    @Column(name="created_at")
    private LocalDateTime cratedAt;

}
