package com.example.demo.entity;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.UpdateTimestamp;

import com.example.demo.entity.join_table.StaffServices;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedAttributeNode;
import jakarta.persistence.NamedEntityGraph;
import jakarta.persistence.NamedSubgraph;
import jakarta.persistence.OneToMany;
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
@NamedEntityGraph(
    name = "BusinessServices.withBusinessAndAddress",
    attributeNodes = @NamedAttributeNode(value = "business", subgraph = "business-address"),
    subgraphs = @NamedSubgraph(
        name = "business-address",
        attributeNodes = @NamedAttributeNode("address")
    )
)
@NamedEntityGraph(name = "ServiceDetails",
    attributeNodes = {
        @NamedAttributeNode(value = "business", subgraph = "business-address"),
        @NamedAttributeNode("staffs"),
    },
    subgraphs = {
        @NamedSubgraph(
            name = "business-address", 
            attributeNodes = @NamedAttributeNode("address")
        )
    }
)
@NamedEntityGraph(name = "serviceWithRating", 
    attributeNodes = {
        @NamedAttributeNode("reviews"),
        @NamedAttributeNode("business")
    }
)
public class BusinessServices {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @JoinColumn(name = "business_id")
    @ManyToOne
    private Business business;

    @Column(name = "service_name")
    private String serviceName;

    @Column(name="description")
    private String description;

    @Column(name = "duration", columnDefinition = "interval")
    private Duration duration;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "status")
    private String status;

    @Column(name = "capacity")
    private Integer capacity;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "service_logo_url")
    private String serviceLogoUrl;

    @ManyToMany(mappedBy = "services")
    private List<Staff> staffs;

    @OneToMany(mappedBy = "service")
    private List<Schedule> schedules;

    @OneToMany(mappedBy = "services")
    private List<ServiceReviews> reviews;

    @OneToMany(mappedBy = "services", cascade = CascadeType.ALL)
    private List<ServiceAvailability> availabilities;

    @OneToMany(mappedBy = "services", cascade = CascadeType.ALL)
    private List<ServiceCategory> categories;

    @OneToMany(mappedBy = "services")
    List<StaffServices> staffServices;

}