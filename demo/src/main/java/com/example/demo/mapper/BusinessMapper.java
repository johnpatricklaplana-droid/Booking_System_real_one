package com.example.demo.mapper;

import java.time.Duration;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.example.demo.dto.AddServiceRequestDto;
import com.example.demo.dto.AddStaffDto;
import com.example.demo.dto.BusinessDetailsDto;
import com.example.demo.dto.ServicesDetailsDto;
import com.example.demo.dto.StaffResponseDto;
import com.example.demo.entity.Address;
import com.example.demo.entity.Business;
import com.example.demo.entity.BusinessServices;
import com.example.demo.entity.Staff;
import com.example.demo.entity.Users;

import jakarta.persistence.EntityManager;

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
    @Mapping(source = "user", target = "ownerName") 
    @Mapping(source = "address", target = "address") 
    @Mapping(source = "timezone", target = "timezone") 
    @Mapping(source = "logoUrl", target = "businessLogoUrl") 
    BusinessDetailsDto toBusinessDetailsDto(Business business);
    
    @Mapping(source = "business.businessName", target = "businessName")
    @Mapping(source = "business.address.displayName", target = "address")
    @Mapping(source = "business.timezone", target = "timezone")
    ServicesDetailsDto toBusinessServices(BusinessServices services);

    StaffResponseDto toStaffResponseDto(Staff staff);

    @Mapping(target = "business", expression = "java(entityManager.getReference(Business.class, request.getBusinessId()))")
    @Mapping(target = "status", constant = "ACTIVE")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "serviceLogoUrl", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "staffs", ignore = true)
    BusinessServices toSaveBusinessServices(AddServiceRequestDto request, @Context EntityManager entityManager);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "avatarUrl", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "services", expression = "java(fromListOfUUIDToListOfBusinessServices(staff.getServiceId(), entityManager))")
    @Mapping(target = "business", expression = "java(entityManager.getReference(Business.class, staff.getBusinessId()))")
    Staff toStaffSave(AddStaffDto staff, @Context EntityManager entityManager);

    default List<BusinessServices> fromListOfUUIDToListOfBusinessServices(List<UUID> servicesIds, EntityManager entityManager) {

        return servicesIds.stream()
            .map(sid -> entityManager.getReference(BusinessServices.class, sid))
            .toList();

    }

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
