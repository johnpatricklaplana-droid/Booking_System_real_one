package com.example.demo.entity;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.DynamicInsert;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "services")
@Entity
@Setter
@Getter
@NoArgsConstructor
@DynamicInsert
public class BusinessServices {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    @JoinColumn(name = "business_id")
    @ManyToOne
    private Business business;

    @Column(name = "service_name")
    private String serviceName;

    @Column(name = "duration", columnDefinition = "interval")
    private Duration duration;

    @Column(name = "price")
    private double price;

    @Column(name = "status")
    private String status;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "service_logo_url")
    private String serviceLogoUrl;

}
