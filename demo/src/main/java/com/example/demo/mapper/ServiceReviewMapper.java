package com.example.demo.mapper;

import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.demo.dto.request.AddServicesReviewDto;
import com.example.demo.dto.response.ServiceReviewDto;
import com.example.demo.entity.BusinessServices;
import com.example.demo.entity.ServiceReviews;

import jakarta.persistence.Column;
import jakarta.persistence.EntityManager;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Mapper(componentModel = "spring")
public interface ServiceReviewMapper {
    
    @Mapping(target = "schedule", expression = "java(entityManager.getReference(Schedule.class, reviewDto.getScheduleId()))")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "services", ignore = true)
    ServiceReviews toServiceReviews(AddServicesReviewDto reviewDto, EntityManager entityManager);

    ServiceReviewDto toServiceReviewDto(ServiceReviews reviews);

}
