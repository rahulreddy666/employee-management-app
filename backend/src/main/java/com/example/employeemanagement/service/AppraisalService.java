package com.example.employeemanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.employeemanagement.entity.Appraisal;
import com.example.employeemanagement.repository.AppraisalRepository;

@Service
public class AppraisalService {

    @Autowired
    private AppraisalRepository appraisalRepository;

    // GET ALL
    public List<Appraisal> getAllAppraisals() {
        return appraisalRepository.findAll();
    }

    // GET BY ID
    public Optional<Appraisal> getAppraisalById(Long id) {
        return appraisalRepository.findById(id);
    }

    // CREATE
    public Appraisal createAppraisal(Appraisal appraisal) {
        return appraisalRepository.save(appraisal);
    }

    // UPDATE
    public Appraisal updateAppraisal(Long id, Appraisal updated) {

        Appraisal appraisal = appraisalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appraisal not found"));

        appraisal.setEmployeeName(updated.getEmployeeName());
        appraisal.setDepartment(updated.getDepartment());
        appraisal.setReviewPeriod(updated.getReviewPeriod());
        appraisal.setRating(updated.getRating());
        appraisal.setStatus(updated.getStatus());
        appraisal.setRemarks(updated.getRemarks());
        appraisal.setSalaryIncrease(updated.getSalaryIncrease());

        return appraisalRepository.save(appraisal);
    }

    // DELETE
    public void deleteAppraisal(Long id) {
        appraisalRepository.deleteById(id);
    }
}
