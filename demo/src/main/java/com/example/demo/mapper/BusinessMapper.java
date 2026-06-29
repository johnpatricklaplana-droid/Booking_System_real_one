package com.example.demo.mapper;

import java.time.Duration;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.example.demo.dto.AddServiceRequestDto;
import com.example.demo.dto.AddStaffDto;
import com.example.demo.dto.AddressDto;
import com.example.demo.dto.BusinessDetailsDto;
import com.example.demo.dto.ServiceDetailsDto;
import com.example.demo.dto.ServicesDetailsDto;
import com.example.demo.dto.StaffResponseDto;
import com.example.demo.dto.StaffResponseDtoWithoutServices;
import com.example.demo.dto.StaffUnavailableDto;
import com.example.demo.entity.Address;
import com.example.demo.entity.Business;
import com.example.demo.entity.BusinessServices;
import com.example.demo.entity.Staff;
import com.example.demo.entity.StaffUnavailable;
import com.example.demo.entity.Users;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.hypersistence.utils.hibernate.type.range.Range;
import jakarta.persistence.Column;
import jakarta.persistence.EntityManager;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToOne;

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
    @Mapping(target = "schedules", ignore = true)
    BusinessServices toSaveBusinessServices(AddServiceRequestDto request, @Context EntityManager entityManager);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "avatarUrl", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "services", expression = "java(fromListOfUUIDToListOfBusinessServices(staff.getServiceId(), entityManager))")
    @Mapping(target = "business", expression = "java(entityManager.getReference(Business.class, staff.getBusinessId()))")
    @Mapping(target = "staffs", ignore = true)
    @Mapping(target = "unavailable", ignore = true)
    Staff toStaffSave(AddStaffDto staff, @Context EntityManager entityManager);

    ServiceDetailsDto toServicesDetailsDto(BusinessServices services);

    @Mapping(source = "province", target = "state")
    @Mapping(target = "houseNumber", ignore = true)
    @Mapping(target = "village", ignore = true)
    @Mapping(target = "region", ignore = true)
    @Mapping(source = "countryCode", target = "countryCode")
    AddressDto toAddressDto(Address address);

    @Mapping(source = "id", target = "staffId")
    @Mapping(source = "unavailable", target = "unavailable")    
    StaffResponseDtoWithoutServices toStaffResponseDtoWithoutServices(Staff staff);

    default List<BusinessServices> fromListOfUUIDToListOfBusinessServices(List<UUID> servicesIds, EntityManager entityManager) {

        return servicesIds.stream()
            .map(sid -> entityManager.getReference(BusinessServices.class, sid))
            .toList();

    }

    @Mapping(target = "start", expression = "java(mapStart(unavailable.getTimeRange()))" )
    @Mapping(target = "end", expression = "java(mapEnd(unavailable.getTimeRange()))")
    StaffUnavailableDto toStaffUnavailableDto(StaffUnavailable unavailable);

    default String mapUserToOwnerName(Users user) {
        return user != null ? user.getFirstName() + " " + user.getLastName() : "Unknown";
    }

    default String mapDurationToString(Duration duration) {
        return duration.toString();
    }

    default ZonedDateTime mapStart(Range<ZonedDateTime> range) {
        return range != null ? range.lower() : null;
    }

    default ZonedDateTime mapEnd(Range<ZonedDateTime> range) {
        return range != null ? range.upper() : null;
    }

}
