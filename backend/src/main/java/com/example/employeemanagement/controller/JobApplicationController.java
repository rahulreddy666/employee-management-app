package com.example.employeemanagement.controller;

import com.example.employeemanagement.entity.JobApplication;
import com.example.employeemanagement.service.JobApplicationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.core.io.Resource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class JobApplicationController {

    @Autowired
    private JobApplicationService applicationService;

    // Apply for job
    @PostMapping("/apply")
    public JobApplication applyForJob(
            @RequestParam Long jobId,
            @RequestParam Long employeeId,
            @RequestParam String coverLetter) {

        return applicationService.applyForJob(jobId, employeeId, coverLetter);
    }

    // Get applicants for a job
    @GetMapping("/job/{jobId}")
    public List<JobApplication> getApplicantsByJob(@PathVariable Long jobId) {
        return applicationService.getApplicantsByJob(jobId);
    }

    // Move candidate stage
    @PutMapping("/{id}/stage")
    public JobApplication updateStage(
            @PathVariable Long id,
            @RequestParam String stage) {

        return applicationService.moveApplicationStage(id, stage);
    }

    // Upload resume and save path in database
    @PostMapping("/{applicationId}/upload-resume")
    public String uploadResume(
            @PathVariable Long applicationId,
            @RequestParam("file") MultipartFile file) {

        try {

            // Validate file
            if (file.isEmpty()) {
                return "File is empty";
            }

            // Folder inside project directory
            String uploadDir = System.getProperty("user.dir")
                    + File.separator + "uploads"
                    + File.separator + "resumes";

            File folder = new File(uploadDir);

            if (!folder.exists()) {
                folder.mkdirs();
            }

            // Get original filename
            String originalFileName = file.getOriginalFilename();

            if (originalFileName == null || originalFileName.isEmpty()) {
                return "Invalid file name";
            }

            // Extract file extension
            String extension = "";
            int dotIndex = originalFileName.lastIndexOf(".");

            if (dotIndex > 0) {
                extension = originalFileName.substring(dotIndex);
            }

            // Generate unique filename
            String uniqueFileName = UUID.randomUUID() + extension;

            // Full file path
            String filePath = uploadDir + File.separator + uniqueFileName;

            File destinationFile = new File(filePath);

            // Save file
            file.transferTo(destinationFile);

            // Verify file saved correctly
            if (!destinationFile.exists() || destinationFile.length() == 0) {
                return "File upload failed";
            }

            // Fetch application from database
            JobApplication application = applicationService.getApplicationById(applicationId);

            // Save relative path in database
            application.setResumePath("uploads/resumes/" + uniqueFileName);

            applicationService.saveApplication(application);

            return "Resume uploaded and saved successfully";

        } catch (Exception e) {
            return "Resume upload failed: " + e.getMessage();
        }
    }

    // Download resume for a job application
    @GetMapping("/{applicationId}/resume")
    public ResponseEntity<Resource> downloadResume(@PathVariable Long applicationId) {

        try {

            // Fetch application from database
            JobApplication application = applicationService.getApplicationById(applicationId);

            // Get resume path stored in DB
            String resumePath = application.getResumePath();

            if (resumePath == null || resumePath.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            // Build absolute file path
            Path path = Paths.get(System.getProperty("user.dir")).resolve(resumePath);

            File file = path.toFile();

            if (!file.exists()) {
                return ResponseEntity.notFound().build();
            }

            Resource resource = new FileSystemResource(file);

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .contentLength(file.length())
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + file.getName() + "\"")
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/{applicationId}/resume/preview")
    public ResponseEntity<Resource> previewResume(@PathVariable Long applicationId) {

        try {

            // Fetch application from database
            JobApplication application = applicationService.getApplicationById(applicationId);

            // Get resume path
            String resumePath = application.getResumePath();

            if (resumePath == null || resumePath.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            // Build absolute path
            Path path = Paths.get(System.getProperty("user.dir")).resolve(resumePath);

            File file = path.toFile();

            if (!file.exists()) {
                return ResponseEntity.notFound().build();
            }

            Resource resource = new FileSystemResource(file);

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .contentLength(file.length())
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "inline; filename=\"" + file.getName() + "\"")
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
