package com.example.demo.dto;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.example.demo.entity.BusinessServices;
import com.example.demo.entity.Staff;
import com.example.demo.entity.Users;

import io.hypersistence.utils.hibernate.type.range.PostgreSQLRangeType;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleResponseDto {
    
    private UUID scheduleId;

    private ZonedDateTime startsAt;
    private LocalDateTime createdAt;
    private String status;

}
