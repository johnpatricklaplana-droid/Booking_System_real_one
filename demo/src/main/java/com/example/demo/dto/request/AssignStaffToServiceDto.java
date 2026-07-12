package com.example.demo.dto.request;

import java.util.List;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssignStaffToServiceDto {
    private UUID serviceId;
    private List<UUID> staffIds;
}
