package com.example.demo.helper;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import com.example.demo.dto.AddressDto;
import com.example.demo.dto.NominatimRawResponse;
import com.example.demo.dto.SearchAddressDto;
import com.example.demo.dto.UserDto;
import com.example.demo.entity.Users;

@Component
public class UserHelper {
    
    public ResponseCookie createJwtCookie (String jwtToken) {
        return ResponseCookie.from("jwt-token", jwtToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(Duration.ofDays(7))
                .sameSite("Strict")
                .build();
    } 

    public List<String> extractUserRole (Users user) {

        return user.getRoles().stream()
            .map(u -> u.getRole())
            .toList();
    }

    public UserDto toUserDto (Users user) {

        UserDto dto = new UserDto();
        dto.setFirstName(user.getFirstName());
        dto.setAvatarUrl(user.getAvatarUrl());
        dto.setLastName(user.getLastName());
        dto.setRoles(user.getRoles().stream().map(r -> r.getRole()).toList());
        dto.setEmail(user.getEmail());
        dto.setLastActiveRole(user.getLastActiveRole());

        return dto;

    }

    public SearchAddressDto toSearchAddressDto (NominatimRawResponse raw, String timezone) {
        AddressDto address = raw.getAddress();
        return SearchAddressDto.builder()
            .lon(raw.getLon())
            .lat(raw.getLat())
            .displayName(raw.getDisplayName())
            .houseNumber(address != null ? address.getHouseNumber() : null)
            .road(address !=  null ? address.getRoad() : null)
            .city(address != null ? address.getCity() : null)
            .province(address != null ? address.getState() : null)
            .postalCode(address != null ? address.getPostalCode() : null)
            .country(address != null ? address.getCountry() : null)
            .countryCode(address != null ? address.getCounrtyCode() : null)
            .timezone(timezone)
            .build();
    }

}
