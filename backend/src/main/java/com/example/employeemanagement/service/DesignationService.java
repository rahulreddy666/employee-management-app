package com.example.employeemanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.employeemanagement.entity.Designation;
import com.example.employeemanagement.repository.DesignationRepository;

import java.util.List;

@Service
public class DesignationService {

    @Autowired
    private DesignationRepository repository;

    public Designation createDesignation(String title) {

        if (repository.existsByTitle(title)) {
            throw new RuntimeException("Designation already exists");
        }

        Designation designation = new Designation(title);
        return repository.save(designation);
    }

    public List<Designation> getAllDesignations() {
        return repository.findAll();
    }

    public void deleteDesignation(int id) {
        repository.deleteById(id);
    }

    public Designation updateDesignation(int id, String title) {

        Designation designation = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Designation not found"));

        designation.setTitle(title);
        return repository.save(designation);
    }
}