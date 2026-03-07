package com.example.employeemanagement.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.example.employeemanagement.entity.EmployeeProfile;
import com.example.employeemanagement.service.EmployeeProfileService;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
@Validated
public class EmployeeProfileController {

    private final EmployeeProfileService service;

    // Constructor Injection
    public EmployeeProfileController(EmployeeProfileService service) {
        this.service = service;
    }

    // =====================================================
    // CREATE PROFILE
    // =====================================================
    @PostMapping
    public ResponseEntity<EmployeeProfile> create(
            @Valid @RequestBody EmployeeProfile emp) {

        EmployeeProfile saved = service.save(emp);
        return ResponseEntity.status(201).body(saved);
    }

    // =====================================================
    // GET ALL PROFILES
    // =====================================================
    @GetMapping
    public ResponseEntity<List<EmployeeProfile>> getAll() {

        List<EmployeeProfile> list = service.getAll();

        if (list.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(list);
    }

    // =====================================================
    // 🔹 NEW: GET BY DESIGNATION
    // =====================================================
    @GetMapping("/by-designation/{designation}")
    public ResponseEntity<List<EmployeeProfile>> getByDesignation(
            @PathVariable String designation) {

        List<EmployeeProfile> list =
                service.getByDesignation(designation);

        if (list.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(list);
    }

    // =====================================================
    // GET SINGLE PROFILE
    // =====================================================
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeProfile> getOne(
            @PathVariable Long id) {

        EmployeeProfile profile = service.getById(id);

        if (profile == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(profile);
    }

    // =====================================================
    // UPDATE PROFILE
    // =====================================================
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeProfile> update(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeProfile emp) {

        emp.setId(id);

        EmployeeProfile updated = service.save(emp);

        return ResponseEntity.ok(updated);
    }

    // =====================================================
    // DELETE PROFILE
    // =====================================================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}