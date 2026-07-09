package com.example.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.demo.dto.request.ServiceAvailabilityDto;
import com.example.demo.dto.request.ServiceCategoryDto;
import com.example.demo.entity.ServiceAvailability;
import com.example.demo.entity.ServiceCategory;

@Mapper(componentModel = "spring")
public interface ServiceMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "services", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    ServiceCategory toServiceCategory(ServiceCategoryDto categoryDto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "services", ignore = true)
    ServiceAvailability toServiceAvailability(ServiceAvailabilityDto availabilityDto);

    ServiceAvailabilityDto toServiceAvailabilityDto(ServiceAvailability serviceAvailability);

}
