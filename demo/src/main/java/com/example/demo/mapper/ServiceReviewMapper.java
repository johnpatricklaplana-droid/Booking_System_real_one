package com.example.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.demo.dto.request.AddServicesReviewDto;
import com.example.demo.dto.response.ServiceReviewDto;
import com.example.demo.entity.ServiceReviews;
import com.example.demo.entity.Schedule;

import jakarta.persistence.EntityManager;

@Mapper(componentModel = "spring", imports = Schedule.class)
public interface ServiceReviewMapper {
    
    @Mapping(target = "schedule", expression = "java(entityManager.getReference(Schedule.class, reviewDto.getScheduleId()))")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "services", ignore = true)
    ServiceReviews toServiceReviews(AddServicesReviewDto reviewDto, EntityManager entityManager);

    ServiceReviewDto toServiceReviewDto(ServiceReviews reviews);

}
