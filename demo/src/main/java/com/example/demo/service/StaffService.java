package com.example.demo.service;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.AddStaffDto;
import com.example.demo.entity.Staff;
import com.example.demo.mapper.BusinessMapper;
import com.example.demo.repositories.StaffRepository;

import jakarta.persistence.EntityManager;

@Service
public class StaffService {

    private final SupabaseStorageService supabaseStorageService;
    private final BusinessMapper businessMapper;
    private final EntityManager entityManager;
    private final StaffRepository staffRepo;

    public StaffService(
        BusinessMapper businessMapper, 
        EntityManager entityManager, 
        StaffRepository staffRepo, 
        SupabaseStorageService supabaseStorageService
    ) {
        this.businessMapper = businessMapper;
        this.entityManager = entityManager;
        this.staffRepo = staffRepo;
        this.supabaseStorageService = supabaseStorageService;
    }

    public void addNewStaff(AddStaffDto request, MultipartFile imageFile, UUID userId) {
        
        Staff staff = businessMapper.toStaffSave(request, entityManager);
        staff.setAvatarUrl(supabaseStorageService.uploadProfilePicOfStaff(imageFile, "staff_logo", userId));

        staffRepo.save(staff);

    }
    
    public byte[] getStaffProfilePic(String userId, String fileName, String bucketName) {
        return supabaseStorageService.getStaffProfilePic(userId, fileName, bucketName);
    }

}