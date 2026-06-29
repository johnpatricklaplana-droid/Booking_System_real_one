package com.example.demo.entity;

import java.time.ZonedDateTime;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonSubTypes.Type;

import io.hypersistence.utils.hibernate.type.range.PostgreSQLRangeType;
import io.hypersistence.utils.hibernate.type.range.Range;
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

@Table(name = "staff_unavailable")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class StaffUnavailable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @JoinColumn(name = "staff_id")
    @ManyToOne
    private Staff staffs;

    @Column(name = "time_range", columnDefinition = "tstzrange")
    @Type(PostgreSQLRangeType.class)
    private Range<ZonedDateTime> timeRange;

}
