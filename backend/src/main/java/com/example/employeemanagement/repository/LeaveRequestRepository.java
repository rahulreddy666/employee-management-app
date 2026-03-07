package com.example.employeemanagement.repository;

import com.example.employeemanagement.entity.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Integer> {

    List<LeaveRequest> findByEmployeeId(String employeeId);

}