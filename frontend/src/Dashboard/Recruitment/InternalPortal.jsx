import React, { useState, useMemo, useCallback } from "react";
import "./InternalPortal.css";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Drawer,
  TextField,
  LinearProgress,
  IconButton,
  InputAdornment,
  Tabs,
  Tab,
  Avatar,
  ThemeProvider,
  createTheme,
  Chip,
} from "@mui/material";

import { Close, Search } from "@mui/icons-material";

/* ================= CONSTANTS ================= */

const ROLES = { EMPLOYEE: "Employee", MANAGER: "Manager", HR: "HR" };

const STAGES = [
  "Applied",
  "Manager Review",
  "Technical Panel",
  "HR Discussion",
  "Selected",
  "Rejected"
];

/* ================= MOCK USER ================= */

const currentUser = {
  id: "EMP101",
  name: "Sreekanth",
  role: ROLES.MANAGER,
  skills: ["React", "Redux", "SQL", "CSS", "MUI"],
  experience: 2,
};

/* ================= MOCK JOBS ================= */

const initialJobs = [
  {
    id: 1,
    title: "Frontend Engineer",
    company: "Abhishyandh Global Solutions",
    companyLogo: "https://via.placeholder.com/50",
    loc: "Hyderabad",
    type: "Full Time",
    salary: "₹8-12 LPA",
    minExperience: 1,
    postedDate: new Date("2026-02-01"),
    status: "Open",
    desc: "Build scalable UI systems using React, Redux, and MUI.",
    coreSkills: ["React", "Redux", "MUI"],
    responsibilities: [
      "Develop responsive UIs",
      "Maintain component library",
      "Ensure cross-browser compatibility"
    ],
    requirements: ["React 2+ years", "Redux", "MUI", "CSS/HTML proficiency"],
    benefits: ["Health insurance", "Remote options", "Annual bonus"],
    applicants: []
  },
  {
    id: 2,
    title: "Backend Node.js Developer",
    company: "Abhishyandh Global Solutions",
    companyLogo: "https://via.placeholder.com/50",
    loc: "Hyderabad",
    type: "Full Time",
    salary: "₹14-18 LPA",
    minExperience: 2,
    postedDate: new Date("2026-01-25"),
    status: "Open",
    desc: "Design and build scalable REST APIs and microservices.",
    coreSkills: ["Node.js", "Express", "MongoDB"],
    responsibilities: [
      "Develop REST APIs",
      "Database optimization",
      "Ensure security"
    ],
    requirements: ["Node.js 2+ years", "MongoDB", "REST APIs", "Docker experience"],
    benefits: ["PF", "Medical coverage", "Flexible hours"],
    applicants: []
  }
];

/* ================= HELPERS ================= */

const skillColor = (percent) =>
  percent >= 80 ? "#4caf50" : percent >= 50 ? "#ff9800" : "#f44336";

/* ================= JOB CARD ================= */

const JobCard = ({ job, skillMatch, onClick }) => (
  <Card
    onClick={onClick}
    sx={{
      cursor: "pointer",
      transition: "0.3s",
      "&:hover": { boxShadow: 6 },
    }}
  >
    <CardContent>

      <Box display="flex" gap={2}>
        <Avatar src={job.companyLogo} />

        <Box>
          <Typography variant="h6">{job.title}</Typography>

          <Typography color="textSecondary">
            {job.company} • {job.loc}
          </Typography>

          <Typography variant="caption">
            Posted: {job.postedDate.toDateString()}
          </Typography>
        </Box>
      </Box>

      <Box mt={1}>
        <LinearProgress
          variant="determinate"
          value={skillMatch}
          sx={{
            height: 8,
            borderRadius: 5,
            "& .MuiLinearProgress-bar": {
              backgroundColor: skillColor(skillMatch)
            }
          }}
        />

        <Typography variant="caption">
          {skillMatch}% skill match
        </Typography>
      </Box>

      <Box mt={1}>
        {job.coreSkills.map((s) => (
          <Chip key={s} label={s} size="small" sx={{ mr: 0.5, mt: 0.5 }} />
        ))}
      </Box>

    </CardContent>
  </Card>
);

/* ================= MAIN COMPONENT ================= */

export default function InternalPortal() {

  const [jobs, setJobs] = useState(initialJobs);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [tab, setTab] = useState(0);

  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

  const [search, setSearch] = useState("");

  /* ================= APPLY ================= */

  const applyJob = () => {

    if (!resumeFile) {
      alert("Please upload resume first");
      return;
    }

    const applicant = {
      name: currentUser.name,
      status: "Applied",
      resume: resumeFile.name,
      cover: coverLetter
    };

    setJobs(prev =>
      prev.map(job =>
        job.id === selectedJob.id
          ? { ...job, applicants: [...job.applicants, applicant] }
          : job
      )
    );

    alert("Application submitted");

    setDrawerOpen(false);
  };

  const theme = useMemo(
    () => createTheme({ palette: { mode: "light" } }),
    []
  );

  const skillMatch = useCallback(
    (job) =>
      Math.round(
        (job.coreSkills.filter((s) =>
          currentUser.skills.includes(s)
        ).length / job.coreSkills.length) * 100
      ),
    []
  );

  const filteredJobs = useMemo(
    () =>
      jobs
        .filter(
          (j) =>
            j.title.toLowerCase().includes(search.toLowerCase()) ||
            j.company.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => skillMatch(b) - skillMatch(a)),
    [jobs, search, skillMatch]
  );

  const moveApplicantStage = (stage, applicantIndex) => {

    setJobs(prev => {

      const updatedJobs = prev.map(j => {

        if (j.id !== selectedJob.id) return j;

        const updatedApplicants = [...j.applicants];

        updatedApplicants[applicantIndex] = {
          ...updatedApplicants[applicantIndex],
          status: stage
        };

        return { ...j, applicants: updatedApplicants };

      });

      const updatedSelected = updatedJobs.find(j => j.id === selectedJob.id);
      setSelectedJob(updatedSelected);

      return updatedJobs;

    });

  };

  return (
    <ThemeProvider theme={theme}>
      <Box p={3} sx={{ maxWidth: "1200px", margin: "auto" }}>

        <Typography variant="h4" mb={3}>
          Internal Job Portal
        </Typography>

        <Box mb={3}>
          <TextField
            fullWidth
            placeholder="Search jobs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
          />
        </Box>

        <Grid container spacing={4}>
          {filteredJobs.map((job) => (
            <Grid item xs={12} md={6} key={job.id}>
              <JobCard
                job={job}
                skillMatch={skillMatch(job)}
                onClick={() => {
                  setSelectedJob(job);
                  setDrawerOpen(true);
                  setTab(0);
                }}
              />
            </Grid>
          ))}
        </Grid>

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{ sx: { width: 600, p: 3 } }}
        >

          {selectedJob && (

            <>

              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="h5">{selectedJob.title}</Typography>
                <IconButton onClick={() => setDrawerOpen(false)}>
                  <Close />
                </IconButton>
              </Box>

              <Tabs
  value={tab}
  onChange={(e, v) => setTab(v)}
  variant="fullWidth"
>
                <Tab label="Description" />
                <Tab label="Apply" />
                <Tab label="Applicants" />
              </Tabs>

              {/* DESCRIPTION */}

              {tab === 0 && (
                <Box sx={{ lineHeight: 1.8 }}>
                  <Typography mb={2}>{selectedJob.desc}</Typography>

                  <Typography fontWeight="bold">Responsibilities:</Typography>
                  <ul>
                    {selectedJob.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>

                  <Typography fontWeight="bold">Requirements:</Typography>
                  <ul>
                    {selectedJob.requirements.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>

                  <Typography fontWeight="bold">Benefits:</Typography>
                  <ul>
                    {selectedJob.benefits.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </Box>
              )}

              {/* APPLY */}

              {tab === 1 && (

                <Box display="flex" flexDirection="column" gap={2} mt={2}>

                  <TextField
                    type="file"
                    onChange={(e) =>
                      setResumeFile(e.target.files[0])
                    }
                  />

                  <TextField
                    label="Cover Letter"
                    multiline
                    rows={4}
                    value={coverLetter}
                    onChange={(e) =>
                      setCoverLetter(e.target.value)
                    }
                  />

                  <Button
                    variant="contained"
                    onClick={applyJob}
                  >
                    Apply
                  </Button>

                </Box>

              )}

              {/* APPLICANTS */}

              {tab === 2 && (

                <Box mt={2} sx={{ overflowX: "auto" }}>

                  <Grid container spacing={2} wrap="nowrap">

                    {STAGES.map((stage) => {

                      const nextStage = STAGES[STAGES.indexOf(stage) + 1];

                      return (

                        <Grid item key={stage} sx={{ minWidth: 220 }}>

                          <Box
                            sx={{
                              minHeight: 220,
                              bgcolor: "#eef2f7",
                              borderRadius: 3,
                              p: 2,
                              boxShadow: 1
                            }}
                          >

                            <Typography fontWeight="bold" mb={1}>
                              {stage}
                            </Typography>

                            {selectedJob.applicants
                              ?.map((app, index) => ({ ...app, index }))
                              .filter((app) => app.status === stage)
                              .map((app) => (

                                <Box
  key={app.index}
  sx={{
    bgcolor: "white",
    p: 1,
    mb: 1,
    borderRadius: 2,
    boxShadow: 1
  }}
>

  <Typography variant="body2">
    {app.name}
  </Typography>

  <Typography variant="caption">
    Resume: {app.resume}
  </Typography>

  <Typography variant="caption" display="block">
    Cover: {app.cover}
  </Typography>

  {nextStage && (

    <Button
      size="small"
      sx={{ mt: 1 }}
      onClick={() =>
        moveApplicantStage(nextStage, app.index)
      }
    >
      Move →
    </Button>

  )}

</Box>

                              ))}

                          </Box>

                        </Grid>

                      );

                    })}

                  </Grid>

                </Box>

              )}

            </>

          )}

        </Drawer>

      </Box>
    </ThemeProvider>
  );
}