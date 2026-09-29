package com.pulsefit.attendance.repository;

import com.pulsefit.attendance.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findByMemberId(Long memberId);

    List<Attendance> findByFacilityId(String facilityId);

    List<Attendance> findByMemberIdAndStatus(Long memberId, String status);
}
