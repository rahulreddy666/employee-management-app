package com.example.employeemanagement.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.sql.Timestamp;

@Entity
@Table(name = "leave_requests")
public class LeaveRequest {

    // ================= PRIMARY KEY =================
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    // ================= EMPLOYEE ID =================
    @Column(name = "employee_id", nullable = false)
    private String employeeId;


    // ================= LEAVE TYPE =================
    @Column(name = "leave_type", nullable = false)
    private String leaveType;


    // ================= START DATE =================
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;


    // ================= END DATE =================
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;


    // ================= REASON =================
    @Column(nullable = false)
    private String reason;


    // ================= STATUS =================
    @Column(nullable = false)
    private String status;


    /*
     IMPORTANT CONFIGURATION:

     insertable = false
     → Hibernate will NOT insert value into applied_date

     updatable = false
     → Hibernate will NOT update applied_date

     MySQL automatically sets CURRENT_TIMESTAMP
     because your table has:

     applied_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    */
    @Column(
        name = "applied_date",
        insertable = false,
        updatable = false
    )
    private Timestamp appliedDate;


    // ================= GETTERS AND SETTERS =================

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }


    public String getLeaveType() {
        return leaveType;
    }

    public void setLeaveType(String leaveType) {
        this.leaveType = leaveType;
    }


    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }


    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }


    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    public Timestamp getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(Timestamp appliedDate) {
        this.appliedDate = appliedDate;
    }
}