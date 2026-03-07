package com.example.employeemanagement.service;

import com.example.employeemanagement.entity.Job;
import com.example.employeemanagement.repository.JobRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Override
    public List<Job> getAllActiveJobs() {
        return jobRepository.findByActiveTrue();
    }

    @Override
    public Job getJobById(Long id) {
        return jobRepository.findById(id).orElse(null);
    }
}
