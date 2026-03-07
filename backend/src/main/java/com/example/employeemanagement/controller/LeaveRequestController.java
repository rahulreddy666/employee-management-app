package com.example.employeemanagement.controller;

import com.example.employeemanagement.entity.LeaveRequest;
import com.example.employeemanagement.service.LeaveRequestService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin("*")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService service;


    // Apply Leave (unchanged)
    @PostMapping("/apply")
    public LeaveRequest applyLeave(@RequestBody LeaveRequest leave) {

        return service.applyLeave(leave);
    }


    // Get All Leaves (unchanged)
    @GetMapping("/all")
    public List<LeaveRequest> getAllLeaves() {

        return service.getAllLeaves();
    }


    // Get Employee Leaves (unchanged)
    @GetMapping("/employee/{employeeId}")
    public List<LeaveRequest> getEmployeeLeaves(@PathVariable String employeeId) {

        return service.getEmployeeLeaves(employeeId);
    }


    // Approve Leave (MODIFIED: ADMIN only)
    @PutMapping("/approve/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public LeaveRequest approveLeave(@PathVariable int id) {

        return service.approveLeave(id);
    }


    // Reject Leave (MODIFIED: ADMIN only)
    @PutMapping("/reject/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public LeaveRequest rejectLeave(@PathVariable int id) {

        return service.rejectLeave(id);
    }

}