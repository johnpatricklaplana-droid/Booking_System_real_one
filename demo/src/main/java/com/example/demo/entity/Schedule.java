package com.example.demo.entity;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;

import io.hypersistence.utils.hibernate.type.range.PostgreSQLRangeType;
import io.hypersistence.utils.hibernate.type.range.Range;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedAttributeNode;
import jakarta.persistence.NamedEntityGraph;
import jakarta.persistence.NamedSubgraph;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "schedule")
@Entity
@NoArgsConstructor
@Getter
@Setter
@NamedEntityGraph(name = "schedule.staff.service",
    attributeNodes = {
        @NamedAttributeNode("service"),
        @NamedAttributeNode("staff"),
        @NamedAttributeNode("user")
    }
)
@NamedEntityGraph(name = "customer.appointments",
    attributeNodes = {
        @NamedAttributeNode("staff"),
        @NamedAttributeNode(value = "service", subgraph = "service-business")
    },
    subgraphs = @NamedSubgraph(
        name = "service-business",
        attributeNodes = @NamedAttributeNode("business")
    )
)
public class Schedule {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private BusinessServices service;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @Column(name = "starts_at")
    private ZonedDateTime startsAt;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff staff;

    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column(name = "status")
    private String status;

    @Column(name = "time_range", columnDefinition = "tstzrange")
    @Type(PostgreSQLRangeType.class)
    private Range<ZonedDateTime> timeRange;

}
