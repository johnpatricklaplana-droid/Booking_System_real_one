package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.request.AddStaffDto;
import com.example.demo.dto.request.AssignStaffToServiceDto;
import com.example.demo.dto.response.ServicesDetailsDto;
import com.example.demo.dto.response.StaffResponseDto;
import com.example.demo.dto.response.StaffWithServicesDto;
import com.example.demo.entity.BusinessServices;
import com.example.demo.entity.Staff;
import com.example.demo.entity.join_table.StaffServices;
import com.example.demo.mapper.BusinessMapper;
import com.example.demo.repositories.StaffRepository;
import com.example.demo.repositories.join_table.StaffServicesRepository;

import jakarta.persistence.EntityManager;

@Service
public class StaffService {

    private final SupabaseStorageService supabaseStorageService;
    private final BusinessMapper businessMapper;
    private final EntityManager entityManager;
    private final StaffRepository staffRepo;
    private final StaffServicesRepository staffServicesRepo;

    public StaffService(
        BusinessMapper businessMapper, 
        EntityManager entityManager, 
        StaffRepository staffRepo, 
        SupabaseStorageService supabaseStorageService,
        StaffServicesRepository staffServicesRepo
    ) {
        this.businessMapper = businessMapper;
        this.entityManager = entityManager;
        this.staffRepo = staffRepo;
        this.supabaseStorageService = supabaseStorageService;
        this.staffServicesRepo = staffServicesRepo;
    }

    public void addNewStaff(AddStaffDto request, MultipartFile imageFile, UUID userId) {
        Staff staff = businessMapper.toStaffSave(request, entityManager);
        staff.setActive(true);
        staff.setAvatarUrl(supabaseStorageService.uploadProfilePicOfStaff(imageFile, "staff_logo", userId));

        staffRepo.save(staff);

    }
    
    public byte[] getStaffProfilePic(String userId, String fileName, String bucketName) {
        return supabaseStorageService.getStaffProfilePic(userId, fileName, bucketName);
    }

    public List<StaffResponseDto> getStaff(UUID businessId) {
        
        List<Staff> staff = staffRepo.getStaffs(businessId);

        return staff.stream()
            .map(businessMapper::toStaffResponseDto)
            .toList();
    }

    public void assignStaffToAService(AssignStaffToServiceDto assignStaffToServiceDto) {
        
        assignStaffToServiceDto.getServiceId();
        assignStaffToServiceDto.getStaffIds();

        List<StaffServices> staffServices = assignStaffToServiceDto.getStaffIds().stream()
            .map(staffServe -> {
                StaffServices sv = new StaffServices();
                sv.setStaff(entityManager.getReference(Staff.class, staffServe));
                sv.setServices(entityManager.getReference(BusinessServices.class, assignStaffToServiceDto.getServiceId()));
                return sv;
            })
            .toList();

        staffServicesRepo.saveAll(staffServices);

    }

    public List<StaffResponseDto> getStaffOnly(UUID businessId) {
        
        List<Staff> staffs = staffRepo.findAllByBusiness_Id(businessId);

        return staffs.stream()
                .map(businessMapper::toStaffResponseDto)
                .toList();

    }

}