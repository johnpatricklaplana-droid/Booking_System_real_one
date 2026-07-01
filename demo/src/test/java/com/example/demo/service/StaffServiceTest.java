package com.example.demo.service;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.request.AddStaffDto;
import com.example.demo.entity.Business;
import com.example.demo.entity.BusinessServices;
import com.example.demo.entity.Staff;
import com.example.demo.mapper.BusinessMapper;
import com.example.demo.repositories.StaffRepository;

@ExtendWith(MockitoExtension.class)
public class StaffServiceTest {

    @Mock
    private StaffRepository staffRepository; 

    @Mock
    private BusinessMapper businessMapper;

    @InjectMocks
    private StaffService staffService; // REAL service, with fake repo injected

    // ==========================================
    // TEST 1: Happy path - Valid data
    // ==========================================
    @Test
    void addNewStaff_ShouldSaveStaff_WhenEmailIsUnique() {
        // 1. Prepare input DTO
        AddStaffDto dto = new AddStaffDto();
        dto.setFullName("johny hey daddy");
        dto.setBusinessId(UUID.fromString("5b748187-6265-42ff-a29b-ed8694675562"));
        dto.setTitle("My Jesus My Saviour");
        dto.setServiceId(List.of(
            UUID.fromString("5b748187-6265-42ff-a29b-ed8694675562"), 
            UUID.fromString("5b748187-6265-42ff-a29b-ed8694675562"), 
            UUID.fromString("5b748187-6265-42ff-a29b-ed8694675562"), 
            UUID.fromString("5b748187-6265-42ff-a29b-ed8694675562"), 
            UUID.fromString("5b748187-6265-42ff-a29b-ed8694675562"))
        );

        Business business = new Business();
        business.setId(dto.getBusinessId());

        List<BusinessServices> services = dto.getServiceId().stream()
            .map(service -> {
                BusinessServices s = new BusinessServices();
                s.setId(service);

                return s;
            })
            .toList();
        

        Staff staff = new Staff();
        staff.setFullName(dto.getFullName());
        staff.setBusiness(business);
        staff.setTitle(dto.getTitle());
        staff.setServices(services);

        when(businessMapper.toStaffSave(any(AddStaffDto.class), any())).thenReturn(staff);

        when(staffRepository.save(any(Staff.class))).thenReturn(new Staff());

        staffService.addNewStaff(dto, imagefile);

        verify(staffRepository, times(1)).save(any(Staff.class));

        ArgumentCaptor<Staff> captor = ArgumentCaptor.forClass(Staff.class);
        verify(staffRepository).save(captor.capture());

        Staff savedStaff = captor.getValue();

        // 7. Assert that the REAL logic correctly mapped the DTO to Entity
        assertEquals("johny hey daddy", savedStaff.getFullName());
        assertEquals(UUID.fromString("5b748187-6265-42ff-a29b-ed8694675562"), savedStaff.getBusiness().getId());
        assertEquals("My Jesus My Saviour", savedStaff.getTitle());
        assertTrue(savedStaff.getServices().stream().map(s -> s.getId()).toList().containsAll(dto.getServiceId()));
        
    }

    // ==========================================
    // TEST 2: Error path - Duplicate email
    // ==========================================
    // @Test
    // void addNewStaff_ShouldThrowException_WhenEmailAlreadyExists() {
    //     // 1. Prepare input DTO
    //     AddStaffDto dto = new AddStaffDto();
    //     dto.setFullName("john@test.com");

    //     // 2. Stub: findByEmail returns an existing staff (duplicate)
    //     Staff existingStaff = new Staff();
    //     existingStaff.setFullName("john@test.com");
    //     when(staffRepository.findById("john@test.com")).thenReturn(Optional.of(existingStaff));

    //     // 3. Execute & Assert: The service MUST throw the exception
    //     RuntimeException exception = assertThrows(
    //             RuntimeException.class,
    //             () -> staffService.addNewStaff(dto));

    //     // 4. Assert the exception message is correct
    //     assertEquals("Email already exists!", exception.getMessage());

    //     // 5. Verify that save() was NEVER called (because the logic should stop before
    //     // saving)
    //     verify(staffRepository, never()).save(any());
    // }
}