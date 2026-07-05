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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedAttributeNode;
import jakarta.persistence.NamedEntityGraph;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "services_reviews")
@Entity
@Getter
@Setter
@NoArgsConstructor
@NamedEntityGraph(name = "reviewsWithUser", 
    attributeNodes = {
        @NamedAttributeNode("user")
    }
)
public class ServiceReviews {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "comment")
    private String comment;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @JoinColumn(name = "schedule_id", unique = true)
    @OneToOne
    private Schedule schedule;

    @JoinColumn(name = "service_id")
    @ManyToOne
    private BusinessServices services;

    @JoinColumn(name = "user_id")
    @ManyToOne
    private Users user;

}
