package com.example.demo.repositories;

import java.time.Duration;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.example.demo.dto.BusinessDetailsDto;
import com.example.demo.dto.ServicesDetailsDto;
import com.example.demo.entity.Address;
import com.example.demo.entity.Business;
import com.example.demo.entity.BusinessServices;
import com.example.demo.entity.Users;

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
    @Mapping(source = "services", target = "services")
    BusinessDetailsDto toBusinessDetailsDto(Business business);

    @Mapping(source = "duration", target = "duration") 
    @Mapping(source = "serviceName", target = "serviceName") 
    @Mapping(source = "serviceLogoUrl", target = "serviceLogoUrl") 
    @Mapping(source = "status", target = "status") 
    @Mapping(source = "description", target = "description") 
    @Mapping(source = "price", target = "price") 
    ServicesDetailsDto toServicesDetailsDto(BusinessServices service);

    default String mapUserToOwnerName(Users user) {
        return user != null ? user.getFirstName() + " " + user.getLastName() : "Unknown";
    }

    // Maps the Address entity to a single String (concatenate your fields)
    default String mapAddressToString(Address address) {
        return address != null ? address.getDisplayName() : null;
    }

    // Maps java.time.Duration to ISO-8601 String (e.g., "PT1H")
    default String mapDurationToString(Duration duration) {
        return duration != null ? duration.toString() : null;
    }

}
