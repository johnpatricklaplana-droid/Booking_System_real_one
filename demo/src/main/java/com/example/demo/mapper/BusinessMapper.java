package com.example.demo.mapper;

import java.time.Duration;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.example.demo.dto.AddServiceRequestDto;
import com.example.demo.dto.BusinessDetailsDto;
import com.example.demo.dto.ServicesDetailsDto;
import com.example.demo.entity.Address;
import com.example.demo.entity.Business;
import com.example.demo.entity.BusinessServices;
import com.example.demo.entity.Users;
import com.example.demo.service.BusinessService;

import jakarta.persistence.Column;
import jakarta.persistence.EntityManager;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Mapper(componentModel = "spring")
public interface BusinessMapper {
    
    BusinessMapper INSTANCE = Mappers.getMapper(BusinessMapper.class);

    @Mapping(source = "id", target = "businessId")
    @Mapping(source = "businessName", target = "businessName")
    @Mapping(source = "description", target = "description")
    @Mapping(source = "businessType", target = "type")
    @Mapping(source = "createdAt", target = "startedAt")
    @Mapping(source = "businessEmail", target = "businessEmail")
    @Mapping(source = "facebookPage", target = "facebookPage")
    @Mapping(source = "userId", target = "ownerName") 
    @Mapping(source = "addressId", target = "address") 
    @Mapping(source = "timezone", target = "timezone") 
    @Mapping(source = "logoUrl", target = "businessLogoUrl") 
    BusinessDetailsDto toBusinessDetailsDto(Business business);
    
    ServicesDetailsDto toBusinessServices(BusinessServices services);

    @Mapping(target = "business", expression = "java(entityManager.getReference(Business.class, request.getBusinessId()))")
    @Mapping(target = "status", constant = "ACTIVE")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "serviceLogoUrl", ignore = true)
    @Mapping(target = "id", ignore = true)
    BusinessServices toSaveBusinessServices(AddServiceRequestDto request, @Context EntityManager entityManager);

    default String mapUserToOwnerName(Users user) {
        return user != null ? user.getFirstName() + " " + user.getLastName() : "Unknown";
    }

    default String mapAddressToString(Address address) {
        return address != null ? address.getDisplayName() : null;
    }

    default String mapDurationToString(Duration duration) {
        return duration.toString();
    }

}
