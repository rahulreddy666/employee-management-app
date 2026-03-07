package com.example.employeemanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.employeemanagement.entity.EmployeeProfile;

@Repository
public interface EmployeeProfileRepository 
        extends JpaRepository<EmployeeProfile, Long> {

    // 🔹 NEW METHOD (for view by designation)
    List<EmployeeProfile> findByDesignation(String designation);
}