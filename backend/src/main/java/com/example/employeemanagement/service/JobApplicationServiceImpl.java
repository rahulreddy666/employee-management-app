package com.example.employeemanagement.service;

import com.example.employeemanagement.entity.Job;
import com.example.employeemanagement.entity.JobApplication;
import com.example.employeemanagement.entity.Employee;
import com.example.employeemanagement.repository.JobRepository;
import com.example.employeemanagement.repository.JobApplicationRepository;
import com.example.employeemanagement.repository.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class JobApplicationServiceImpl implements JobApplicationService {

    @Autowired
    private JobApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    // Apply for job
    @Override
    public JobApplication applyForJob(Long jobId, Long employeeId, String coverLetter) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        JobApplication application = new JobApplication();

        application.setJob(job);
        application.setEmployee(employee);
        application.setCoverLetter(coverLetter);
        application.setStage("APPLIED");
        application.setAppliedDate(LocalDateTime.now());

        return applicationRepository.save(application);
    }

    // Get all applicants for a job
    @Override
    public List<JobApplication> getApplicantsByJob(Long jobId) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        return applicationRepository.findByJob(job);
    }

    // Move application stage
    @Override
    public JobApplication moveApplicationStage(Long applicationId, String stage) {

        JobApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStage(stage);

        return applicationRepository.save(application);
    }

    // NEW METHOD: Get application by ID
    @Override
    public JobApplication getApplicationById(Long id) {

        return applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
    }

    // NEW METHOD: Save updated application (resume path update)
    @Override
    public JobApplication saveApplication(JobApplication application) {

        return applicationRepository.save(application);
    }
}