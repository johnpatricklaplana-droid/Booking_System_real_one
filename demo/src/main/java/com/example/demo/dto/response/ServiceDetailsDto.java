package com.example.demo.dto.response;

import java.util.List;

public record ServiceDetailsDto(BusinessDetailsDto business, ServicesDetailsDto services, List<StaffResponseDto> staff) {

}  

