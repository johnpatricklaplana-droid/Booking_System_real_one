package com.example.demo.service;

import java.time.Duration;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.request.SaveScheduleDto;
import com.example.demo.dto.response.BookingsDto;
import com.example.demo.dto.response.BusinessDetailsDto;
import com.example.demo.dto.response.CustomerAppointmentDto;
import com.example.demo.dto.response.ScheduleDto;
import com.example.demo.dto.response.ServicesDetailsDto;
import com.example.demo.dto.response.StaffResponseDto;
import com.example.demo.dto.response.UserDtoPublic;
import com.example.demo.entity.BusinessServices;
import com.example.demo.entity.Schedule;
import com.example.demo.entity.Staff;
import com.example.demo.entity.StaffUnavailable;
import com.example.demo.entity.Users;
import com.example.demo.enums.ScheduleStatus;
import com.example.demo.exceptions.InvalidInputsException;
import com.example.demo.mapper.BusinessMapper;
import com.example.demo.mapper.UserMapper;
import com.example.demo.repositories.BusinessServiceRepository;
import com.example.demo.repositories.ScheduleRepository;
import com.example.demo.repositories.StaffRepository;
import com.example.demo.repositories.StaffUnavailableRepository;

import io.hypersistence.utils.hibernate.type.range.Range;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Service
public class ScheduleService {

    @Autowired
    ScheduleRepository scheduleRepo;
    
    @Autowired
    StaffRepository staffRepo;

    @Autowired 
    EntityManager entityManager;

    @Autowired
    BusinessServiceRepository businessServiceRepo;

    @Autowired
    StaffUnavailableRepository staffUnavailableRepo;

    @Autowired
    private BusinessMapper businessMapper;

    @Autowired 
    UserMapper userMapper;

    @Transactional
    public void addSchedule(SaveScheduleDto scheduleDto, UUID userId) {
        
        boolean staffOffersService = staffRepo.existByStaffIdAndServiceId(scheduleDto.getStaffId(), scheduleDto.getServiceId());

        if(!staffOffersService) {
            throw new InvalidInputsException("super bad request");
        }

        BusinessServices services = businessServiceRepo.findById(scheduleDto.getServiceId()).orElse(null);

        String timezone = services.getBusiness().getTimezone();
        ZoneOffset timZoneOffset = ZoneId.of(timezone).getRules().getOffset(Instant.now());

        Duration duration = services.getDuration();

        if(!timZoneOffset.equals(ZonedDateTime.parse(scheduleDto.getStartsAt()).getOffset())) {
            throw new InvalidInputsException("super duper bad request");
        }

        Schedule schedule = new Schedule();
        schedule.setService(entityManager.getReference(BusinessServices.class, scheduleDto.getServiceId()));
        schedule.setStaff(entityManager.getReference(Staff.class, scheduleDto.getStaffId()));
        schedule.setStartsAt(ZonedDateTime.parse(scheduleDto.getStartsAt()));
        schedule.setStatus(ScheduleStatus.PENDING.toString());
        schedule.setUser(entityManager.getReference(Users.class, userId));

        ZonedDateTime start = schedule.getStartsAt();
        ZonedDateTime end = start.plus(duration);

        schedule.setTimeRange(Range.closedOpen(start, end));

        StaffUnavailable unavailable = new StaffUnavailable();
        unavailable.setStaffs(entityManager.getReference(Staff.class, scheduleDto.getStaffId()));
        unavailable.setTimeRange(Range.closedOpen(start, end));

        staffUnavailableRepo.save(unavailable);
        
        scheduleRepo.save(schedule);

    }

    public List<BookingsDto> getBookings(UUID businessId) {
        
        List<UUID> serviceIds = businessServiceRepo.findByBusiness_Id(businessId).stream().map(service -> service.getId()).toList();

        List<Schedule> schedules = scheduleRepo.getBookings(serviceIds);

        return schedules.stream()
            .map(sched -> {
                ServicesDetailsDto services = businessMapper.toBusinessServices(sched.getService());
                StaffResponseDto staff = businessMapper.toStaffResponseDto(sched.getStaff());
                ScheduleDto schedule = businessMapper.toScheduleDto(sched);
                UserDtoPublic user = userMapper.toUserDtoPublic(sched.getUser());
                return new BookingsDto(services, staff, schedule, user);
            })
            .toList();
        
    }

    public List<CustomerAppointmentDto> getUserAppointments(UUID uid) {
        
        List<Schedule> schedules = scheduleRepo.getCustomerAppointments(uid);

        return schedules.stream()
            .map(sched -> {
                ServicesDetailsDto service = businessMapper.toBusinessServices(sched.getService());
                StaffResponseDto staff = businessMapper.toStaffResponseDto(sched.getStaff());
                ScheduleDto schedule = businessMapper.toScheduleDto(sched);
                BusinessDetailsDto business = businessMapper.toBusinessDetailsDto(sched.getService().getBusiness());
                return new CustomerAppointmentDto(
                    service, 
                    staff, 
                    schedule, 
                    business
                );
            })
            .toList();

    }

    public void updateBookingStatus(UUID scheduleId, ScheduleStatus status) {
        
        Schedule schedule = scheduleRepo.findById(scheduleId).orElse(null);

        if(schedule == null) {
            throw new InvalidInputsException("super bad request");
        }

        if(status.toString().equals(schedule.getStatus())) {
            throw new InvalidInputsException("it's already" + status.toString() + "buddy");
        }

        if(status.equals(ScheduleStatus.CONFIRMED) && isItTime(schedule.getStartsAt())) {
            throw new InvalidInputsException("too late now buddy");
        }

        if((status.equals(ScheduleStatus.COMPLETED) || status.equals(ScheduleStatus.MISSED)) && !isItTime(schedule.getStartsAt())) {
                throw new InvalidInputsException("Appointment cannot be marked as completed before its scheduled start time.");
            }
        

        schedule.setStatus(status.toString());

        scheduleRepo.save(schedule);

    }

    private boolean isItTime(ZonedDateTime sched) {
        return ZonedDateTime.now(sched.getZone()).isAfter(sched);
    }

}
