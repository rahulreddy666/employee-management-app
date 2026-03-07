package com.example.employeemanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.employeemanagement.entity.EmployeeProfile;
import com.example.employeemanagement.repository.EmployeeProfileRepository;

@Service
public class EmployeeProfileService {

    @Autowired
    private EmployeeProfileRepository repo;

    // =====================================================
    // CREATE / UPDATE
    // =====================================================
    public EmployeeProfile save(EmployeeProfile profile) {
        return repo.save(profile);
    }

    // =====================================================
    // READ ALL
    // =====================================================
    public List<EmployeeProfile> getAll() {
        return repo.findAll();
    }

    // =====================================================
    // READ ONE
    // =====================================================
    public EmployeeProfile getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    // =====================================================
    // DELETE
    // =====================================================
    public void delete(Long id) {
        repo.deleteById(id);
    }

    // =====================================================
    // 🔹 NEW: GET BY DESIGNATION
    // =====================================================
    public List<EmployeeProfile> getByDesignation(String designation) {
        return repo.findByDesignation(designation);
    }
}