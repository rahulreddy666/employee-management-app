package com.example.employeemanagement.service;

import com.example.employeemanagement.entity.JobApplication;
import java.util.List;

public interface JobApplicationService {

    // Apply for a job
    JobApplication applyForJob(Long jobId, Long employeeId, String coverLetter);

    // Get all applicants for a specific job
    List<JobApplication> getApplicantsByJob(Long jobId);

    // Move candidate to next stage
    JobApplication moveApplicationStage(Long applicationId, String stage);

    // NEW METHOD: Get application by ID
    JobApplication getApplicationById(Long id);

    // NEW METHOD: Save updated application (resume path update)
    JobApplication saveApplication(JobApplication application);
}