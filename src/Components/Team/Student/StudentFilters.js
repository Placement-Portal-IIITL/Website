import { useState, useEffect } from "react";

// API
import axios from "../../../axios";

// MUI Components
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { Stack, Typography, TextField, InputAdornment } from "@mui/material";
import { CircularProgress } from "@mui/material";

// Components
import StudentSearch from "./StudentSearch";

// returns passing years
const getPassingYears = () => {
  const date = new Date();
  const currYear = date.getFullYear();
  const passingYears = [
    { label: currYear, value: currYear },
    { label: currYear + 1, value: currYear + 1 },
    { label: currYear + 2, value: currYear + 2 },
    { label: currYear + 3, value: currYear + 3 },
    { label: currYear + 4, value: currYear + 4 },
    { label: currYear + 5, value: currYear + 5 },
  ];
  return passingYears;
};

const StudentFilters = ({ filters, setFilters }) => {
  // States
  const [department, setDepartment] = useState([]);
  const [course, setCourse] = useState([]);
  const [departmentLoad, setDepartmentLoad] = useState(false);
  const [courseLoad, setCourseLoad] = useState(false);

  useEffect(() => {
    setCourseLoad(true);
    axios
      .get("/getCourseList")
      .then((res) => {
        let tmp = [];
        res.data.courses.map((currCourse) => {
          tmp = [...tmp, { label: currCourse.courseName, value: currCourse._id }];
          return;
        });
        setCourse(tmp);
        setFilters({ ...filters, courseId: res.data.courses[0]._id });
        setCourseLoad(false);
      })
      .catch((err) => {
        setCourseLoad(true);
      });
  }, []);

  useEffect(() => {
    setDepartment([{ label: "", value: "" }]);
    setDepartmentLoad(true);
    setFilters({ ...filters, departmentId: "" });
    axios
      .get("/getDepartmentList", { params: { courseId: filters.courseId } })
      .then((res) => {
        let tmp = [];
        res.data.departments.map((currDepartment) => {
          tmp = [...tmp, { label: currDepartment.departmentName, value: currDepartment._id }];
        });
        setDepartment(tmp);
        setDepartmentLoad(false);
      })
      .catch((err) => {
        setDepartmentLoad(false);
      });
  }, [filters.courseId]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const Filter = ({ id, value, defaultValue, label, name, items, sx }) => {
    return (
      <FormControl
        sx={{ ...sx, m: 1, minWidth: 120, fontSize: "12px" }}
        size="small"
        fullWidth
        margin="dense"
      >
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Select
          defaultValue={defaultValue}
          id={id}
          label={label}
          name={name}
          onChange={handleChange}
          value={value}
        >
          <MenuItem value={0}>Select</MenuItem>
          {items.map((item) => {
            return (
              <MenuItem key={item.value} value={item.value} sx={{ fontSize: "12px" }}>
                {item.label}
              </MenuItem>
            );
          })}
          ;
        </Select>
      </FormControl>
    );
  };

  return (
    <Stack
      sx={{
        width: "100%",
        border: "1px solid rgba(0,0,0,0.2)",
        borderRadius: "5px",
        padding: "15px 24px",
      }}
    >
      <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
        <StudentSearch />
        <Filter
          id="entriesPerPage"
          value={filters.entriesPerPage ? filters.entriesPerPage : 50}
          label="Students Per Page"
          name="entriesPerPage"
          items={[
            { value: 5, label: "5" },
            { value: 10, label: "10" },
            { value: 25, label: "25" },
            { value: 50, label: "50" },
          ]}
          sx={{ width: 150 }}
        />
      </Stack>

      <Typography variant="caption" color="text.secondary" sx={{ margin: "8px 0px 0px 8px" }}>
        <strong>Apply Filters</strong>
      </Typography>
      <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
        <TextField
          variant="outlined"
          select
          size="small"
          name="courseId"
          sx={{ m: 1 }}
          fullWidth
          onChange={handleChange}
          value={filters.courseId}
          label="Select Course"
          disabled={courseLoad}
          InputProps={
            courseLoad
              ? {
                  startAdornment: (
                    <InputAdornment position="start">
                      <CircularProgress size={12} color="inherit" />
                    </InputAdornment>
                  ),
                }
              : null
          }
        >
          <MenuItem key={course[0]?.value} value={course[0]?.value}>
            Select
          </MenuItem>
          {course &&
            course.map((option) => (
              <MenuItem key={option.value} value={option.value} sx={{ fontSize: "12px" }}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
        <Filter
          id="passingYear"
          value={filters.passingYear ? filters.passingYear : 0}
          label="Batch"
          name="passingYear"
          items={getPassingYears()}
        />

        <TextField
          variant="outlined"
          select
          size="small"
          sx={{ m: 1 }}
          name="departmentId"
          fullWidth
          onChange={handleChange}
          value={filters.departmentId ? filters.departmentId : ""}
          label="Select Department"
          disabled={departmentLoad}
          InputProps={
            departmentLoad
              ? {
                  startAdornment: (
                    <InputAdornment position="start">
                      <CircularProgress size={12} color="inherit" />
                    </InputAdornment>
                  ),
                }
              : null
          }
        >
          <MenuItem key="" value="">
            Select
          </MenuItem>
          {department &&
            department.map((option) => (
              <MenuItem key={option.value} value={option.value} sx={{ fontSize: "12px" }}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
        <Filter
          id="aggregateCGPASemester"
          value={filters.aggregateCGPASemester ? filters.aggregateCGPASemester : 0}
          label="Aggregate CGPA till Semester"
          name="aggregateCGPASemester"
          items={[
            { value: 1, label: "1" },
            { value: 2, label: "2" },
            { value: 3, label: "3" },
            { value: 4, label: "4" },
            { value: 5, label: "5" },
            { value: 6, label: "6" },
            { value: 7, label: "7" },
            { value: 8, label: "8" },
            { value: 9, label: "9" },
            { value: 10, label: "10" },
          ]}
        />
      </Stack>
      <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
        <Filter
          id="minCGPA"
          value={filters.minCGPA ? filters.minCGPA : 0}
          label="Min CGPA"
          name="minCGPA"
          items={[
            { value: 5, label: "5" },
            { value: 5.5, label: "5.5" },
            { value: 6, label: "6" },
            { value: 6.5, label: "6.5" },
            { value: 7, label: "7" },
            { value: 7.5, label: "7.5" },
            { value: 8, label: "8" },
            { value: 8.5, label: "8.5" },
            { value: 9, label: "9" },
            { value: 9.5, label: "9.5" },
          ]}
        />
        <Filter
          id="dreamLPA"
          value={filters.dreamLPA ? filters.dreamLPA : 0}
          label="Dream Round (LPA)"
          name="dreamLPA"
          items={[
            { value: 5, label: "5 LPA" },
            { value: 7, label: "7 LPA" },
            { value: 8, label: "8 LPA" },
            { value: 9, label: "9 LPA" },
            { value: 10, label: "10 LPA" },
            { value: 11, label: "11 LPA" },
            { value: 12, label: "12 LPA" },
            { value: 13, label: "13 LPA" },
            { value: 14, label: "14 LPA" },
            { value: 15, label: "15 LPA" },
            { value: 16, label: "16 LPA" },
          ]}
        />

        <Filter
          id="gender"
          value={filters.gender ? filters.gender : 0}
          label="Gender"
          name="gender"
          items={[
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "Other", label: "Other" },
          ]}
        />
        <Filter
          id="isParticipatingInPlacements"
          value={filters.isParticipatingInPlacements ? filters.isParticipatingInPlacements : 0}
          label="Participating in Placements"
          name="isParticipatingInPlacements"
          items={[
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ]}
        />
      </Stack>
    </Stack>
  );
};
export default StudentFilters;
