package com.example.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.demo.dto.request.AddServicesReviewDto;
import com.example.demo.entity.ServiceReviews;

import jakarta.persistence.EntityManager;

@Mapper(componentModel = "spring")
public interface ServiceReviewMapper {
    
    @Mapping(target = "schedule", expression = "java(entityManager.getReference(Schedule.class, reviewDto.getScheduleId()))")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    ServiceReviews toServiceReviews(AddServicesReviewDto reviewDto, EntityManager entityManager);

}
