package com.example.employeemanagement.service;

import com.example.employeemanagement.entity.LeaveRequest;
import com.example.employeemanagement.repository.LeaveRequestRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.sql.Timestamp;

@Service
public class LeaveRequestService {

    @Autowired
    private LeaveRequestRepository repository;


    // Apply Leave (MODIFIED: appliedDate auto set)
    public LeaveRequest applyLeave(LeaveRequest leave) {

        leave.setStatus("Pending");

        // NEW: Automatically set applied date
        leave.setAppliedDate(new Timestamp(System.currentTimeMillis()));

        return repository.save(leave);
    }


    // Get All Leaves (unchanged)
    public List<LeaveRequest> getAllLeaves() {

        return repository.findAll();
    }


    // Get Leaves by Employee ID (unchanged)
    public List<LeaveRequest> getEmployeeLeaves(String employeeId) {

        return repository.findByEmployeeId(employeeId);
    }


    // Get Leave by ID (unchanged)
    public LeaveRequest getLeaveById(int id) {

        Optional<LeaveRequest> optionalLeave = repository.findById(id);

        if (optionalLeave.isPresent()) {

            return optionalLeave.get();

        } else {

            throw new RuntimeException("Leave Request not found with id: " + id);
        }
    }


    // Update Leave Status (unchanged)
    public LeaveRequest updateLeaveStatus(int id, String status) {

        LeaveRequest leave = getLeaveById(id);

        leave.setStatus(status);

        return repository.save(leave);
    }


    // Approve Leave (unchanged logic)
    public LeaveRequest approveLeave(int id) {

        return updateLeaveStatus(id, "Approved");
    }


    // Reject Leave (unchanged logic)
    public LeaveRequest rejectLeave(int id) {

        return updateLeaveStatus(id, "Rejected");
    }

}