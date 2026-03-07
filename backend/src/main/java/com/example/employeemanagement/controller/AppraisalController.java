package com.example.employeemanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.employeemanagement.entity.Appraisal;
import com.example.employeemanagement.service.AppraisalService;

@RestController
@RequestMapping("/api/appraisals")
@CrossOrigin(origins = "http://localhost:3000")
public class AppraisalController {

    @Autowired
    private AppraisalService appraisalService;

    // GET ALL
    @GetMapping
    public List<Appraisal> getAll() {
        return appraisalService.getAllAppraisals();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Appraisal getById(@PathVariable Long id) {
        return appraisalService.getAppraisalById(id)
                .orElseThrow(() -> new RuntimeException("Appraisal not found"));
    }

    // CREATE
    @PostMapping
    public Appraisal create(@RequestBody Appraisal appraisal) {
        return appraisalService.createAppraisal(appraisal);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Appraisal update(
            @PathVariable Long id,
            @RequestBody Appraisal appraisal
    ) {
        return appraisalService.updateAppraisal(id, appraisal);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        appraisalService.deleteAppraisal(id);
        return "Deleted successfully";
    }
}
