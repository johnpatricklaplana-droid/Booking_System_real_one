package com.example.demo.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedAttributeNode;
import jakarta.persistence.NamedEntityGraph;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "business")
@Entity
@NamedEntityGraph(name = "Business.detail", 
    attributeNodes = {
        @NamedAttributeNode("user"),
        @NamedAttributeNode("address")
    }
)
@NoArgsConstructor
@Getter
@Setter
public class Business {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "business_name")
    private String businessName;

    @Column(name = "business_type")
    private String businessType;

    @Column(name = "description")
    private String description;

    @Column(name = "business_email")
    private String businessEmail;

    @Column(name = "facebook_page")
    private String facebookPage;

    @JoinColumn(name = "address_id")
    @OneToOne(cascade = CascadeType.ALL)
    private Address address;

    @Column(name = "timezone")
    private String timezone;

    @Column(name = "status")
    private String status;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @Column(name = "logo_url")
    private String logoUrl;

    @OneToMany(mappedBy = "business")
    private List<BusinessServices> services;

    @OneToMany(mappedBy = "business")
    private List<Staff> staffs;

}
