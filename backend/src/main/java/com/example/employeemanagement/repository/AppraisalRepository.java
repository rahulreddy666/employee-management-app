package com.example.employeemanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.employeemanagement.entity.Appraisal;

public interface AppraisalRepository extends JpaRepository<Appraisal, Long> {
}
