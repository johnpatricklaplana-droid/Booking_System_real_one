package com.example.demo.service;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.request.SaveScheduleDto;
import com.example.demo.dto.response.BookingsDto;
import com.example.demo.dto.response.BusinessDetailsDto;
import com.example.demo.dto.response.CustomerAppointmentDto;
import com.example.demo.dto.response.ScheduleDto;
import com.example.demo.dto.response.ServiceReviewDto;
import com.example.demo.dto.response.ServicesDetailsDto;
import com.example.demo.dto.response.StaffResponseDto;
import com.example.demo.dto.response.UserDtoPublic;
import com.example.demo.entity.BusinessServices;
import com.example.demo.entity.CancellationRequest;
import com.example.demo.entity.Schedule;
import com.example.demo.entity.ServiceAvailability;
import com.example.demo.entity.Staff;
import com.example.demo.entity.StaffUnavailable;
import com.example.demo.entity.Users;
import com.example.demo.enums.ScheduleStatus;
import com.example.demo.enums.ScheduleStatusForCustomerUpdate;
import com.example.demo.exceptions.InvalidInputsException;
import com.example.demo.mapper.BusinessMapper;
import com.example.demo.mapper.ServiceReviewMapper;
import com.example.demo.mapper.UserMapper;
import com.example.demo.repositories.BusinessServiceRepository;
import com.example.demo.repositories.CancellationRequestRepository;
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

    @Autowired
    ServiceReviewMapper serviceReviewMapper;

    @Autowired
    CancellationRequestRepository cancellationRequestRepo;

    @Transactional
    public void addSchedule(SaveScheduleDto scheduleDto, UUID userId) {
        
        boolean staffOffersService = staffRepo.existByStaffIdAndServiceId(scheduleDto.getStaffId(), scheduleDto.getServiceId());

        if(!staffOffersService) {
            throw new InvalidInputsException("super bad request");
        }

        BusinessServices services = businessServiceRepo.findById(scheduleDto.getServiceId()).orElse(null);

        if (ZonedDateTime.parse(scheduleDto.getStartsAt()).isBefore(ZonedDateTime.now(ZoneId.of(services.getBusiness().getTimezone())))) {
            throw new InvalidInputsException("this time is already passed buddy");
        }

        String timezone = services.getBusiness().getTimezone();
        ZoneOffset timZoneOffset = ZoneId.of(timezone).getRules().getOffset(Instant.now());

        Duration duration = services.getDuration();

        if(!timZoneOffset.equals(ZonedDateTime.parse(scheduleDto.getStartsAt()).getOffset())) {
            throw new InvalidInputsException("super duper bad request");
        }

        OffsetDateTime odt = OffsetDateTime.parse(scheduleDto.getStartsAt());
        DayOfWeek day = odt.getDayOfWeek();
        
        ServiceAvailability sa = services.getAvailabilities().stream()
                .filter(sav -> sav.getDay().equals(day.toString()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No availability for " + day));

        if(!isTimeFit(sa, odt, (int) services.getDuration().toMinutes())) {
            throw new InvalidInputsException("service is not available in this time buddy");
        }

        services.getAvailabilities().forEach(a -> { 
            a.getStartTime();
            a.getEndTime(); 
        });

        Schedule schedule = new Schedule();
        schedule.setService(entityManager.getReference(BusinessServices.class, scheduleDto.getServiceId()));
        schedule.setStaff(entityManager.getReference(Staff.class, scheduleDto.getStaffId()));
        schedule.setStartsAt(ZonedDateTime.parse(scheduleDto.getStartsAt()));
        schedule.setStatus(ScheduleStatus.PENDING.toString());
        schedule.setUser(entityManager.getReference(Users.class, userId));

        ZonedDateTime start = schedule.getStartsAt();
        ZonedDateTime end = start.plus(duration);

        schedule.setTimeRange(Range.closedOpen(start, end));

        // I FORGOT WHY IS THIS EXIST I ACTUALLY REMEMBER BUT AM I USING IT?
        StaffUnavailable unavailable = new StaffUnavailable();
        unavailable.setStaffs(entityManager.getReference(Staff.class, scheduleDto.getStaffId()));
        unavailable.setTimeRange(Range.closedOpen(start, end));

        staffUnavailableRepo.save(unavailable);
        
        scheduleRepo.save(schedule);

    }

    public List<BookingsDto> getBookings(UUID businessId) {
        //TODO: get only IDS
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
                ServiceReviewDto review = serviceReviewMapper.toServiceReviewDto(sched.getReviews());
                boolean isAlreadyRatedByYou = sched.getReviews() != null;
                return new CustomerAppointmentDto(
                    service, 
                    staff, 
                    schedule, 
                    business,
                    isAlreadyRatedByYou,
                    review
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
            throw new InvalidInputsException("Appointment cannot be marked as completed or missed before its scheduled start time.");
        }

        if((status.equals(ScheduleStatus.COMPLETED) || status.equals(ScheduleStatus.MISSED)) && schedule.getStatus().equals(ScheduleStatus.CANCELL_REQUEST.toString())) {
            throw new InvalidInputsException("super bad request don't do that");
        }

        schedule.setStatus(status.toString());

        scheduleRepo.save(schedule);

    }

    public void sendCancellationRequest(UUID scheduleId, ScheduleStatusForCustomerUpdate status, String message) throws BadRequestException {

        Schedule schedule = scheduleRepo.findById(scheduleId).orElse(null);

        if (schedule == null) {
            throw new InvalidInputsException("super bad request");
        }

        int freeCancelationTime = 24;
        int lockCancelHours = 2;

        ZonedDateTime now = ZonedDateTime.now(
                ZoneId.of(schedule.getService().getBusiness().getTimezone()));

        if (schedule.getStartsAt().isAfter(now.plusHours(freeCancelationTime)) || schedule.getStatus().equals(ScheduleStatus.PENDING.toString())) {
            schedule.setStatus(status.toString());

            scheduleRepo.save(schedule);
            return;
        }

        if (schedule.getStartsAt().isAfter(now.plusHours(lockCancelHours))
                && schedule.getStartsAt().isBefore(now.plusHours(freeCancelationTime))) {
            CancellationRequest cancellationRequest = new CancellationRequest();
            cancellationRequest.setSchedule(schedule);
            cancellationRequest.setMessage(message);
            cancellationRequestRepo.save(cancellationRequest);
            schedule.setStatus(ScheduleStatus.CANCELL_REQUEST.toString());

            scheduleRepo.save(schedule);

            return;

        }

        if (schedule.getStartsAt().isBefore(now.plusHours(lockCancelHours))) {
                throw new BadRequestException(
                    "This booking can no longer be cancelled because it is within 2 hours of the scheduled time");
        }
        
    }

    private boolean isItTime(ZonedDateTime sched) {
        return ZonedDateTime.now(sched.getZone()).isAfter(sched);
    }

    private boolean isTimeFit(ServiceAvailability sa, OffsetDateTime startsAt, int durationMinutes) {
        int start = sa.getStartTime().getHour() * 60 + sa.getStartTime().getMinute();
        int end = sa.getEndTime().getHour() * 60 + sa.getEndTime().getMinute();
        int selected = startsAt.getHour() * 60 + startsAt.getMinute();

        return selected >= start && end - durationMinutes >= selected;
    }

}
