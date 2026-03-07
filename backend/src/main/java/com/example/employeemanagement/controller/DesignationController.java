package com.example.employeemanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import com.example.employeemanagement.entity.Designation;
import com.example.employeemanagement.service.DesignationService;

import java.util.List;

@RestController
@RequestMapping("/api/designations")
@CrossOrigin(origins = "http://localhost:3000")
public class DesignationController {

    @Autowired
    private DesignationService service;

    // ADMIN only
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Designation createDesignation(@RequestBody Designation designation) {
        return service.createDesignation(designation.getTitle());
    }

    // ADMIN or EMPLOYEE
    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_EMPLOYEE')")
    public List<Designation> getAllDesignations() {
        return service.getAllDesignations();
    }

    // ADMIN only
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Designation updateDesignation(
            @PathVariable int id,
            @RequestBody Designation designation) {

        return service.updateDesignation(id, designation.getTitle());
    }

    // ADMIN only
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void deleteDesignation(@PathVariable int id) {
        service.deleteDesignation(id);
    }
}