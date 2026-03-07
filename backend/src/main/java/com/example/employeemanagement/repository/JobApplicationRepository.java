package com.example.employeemanagement.repository;

import com.example.employeemanagement.entity.JobApplication;
import com.example.employeemanagement.entity.Job;
import com.example.employeemanagement.entity.Employee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByJob(Job job);

    List<JobApplication> findByEmployee(Employee employee);

}