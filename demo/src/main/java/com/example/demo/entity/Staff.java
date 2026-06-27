package com.example.demo.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedAttributeNode;
import jakarta.persistence.NamedEntityGraph;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "staff")
@NoArgsConstructor
@Getter
@Setter
@NamedEntityGraph(name = "staffWithServices", 
    attributeNodes = {
        @NamedAttributeNode("services")
    }
)
public class Staff {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @JoinColumn(name = "business_id")
    @ManyToOne
    private Business business;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "title")
    private String title;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "is_active")
    private boolean isActive;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToMany
    @JoinTable(
        name = "staff_services",
        joinColumns = @JoinColumn(name = "staff_id"),
        inverseJoinColumns = @JoinColumn(name = "service_id")
    )
    private List<BusinessServices> services;

}
