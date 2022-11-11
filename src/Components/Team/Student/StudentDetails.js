// react hooks
import { useState, useEffect } from "react";

// api
import axios from "../../../axios";

// react router
import { useParams } from "react-router-dom";

// MUI Components
import { Stack, Button, Alert, Snackbar, TextField } from "@mui/material";
import { Chip, Typography, CircularProgress, Grid } from "@mui/material";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
// MUI Icons
import EditIcon from "@mui/icons-material/Edit";
import VerifiedIcon from "@mui/icons-material/Verified";
import UpdateIcon from "@mui/icons-material/Upgrade";

// Components
import StudentPhoto from "../../Profile/ManageProfile/StudentPhoto";
import StudentFormTextField from "../../Profile/ManageProfile/StudentFormTextField";

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

// To make form editable
const EditButton = ({ editable, setEditable }) => {
  const handleClick = () => {
    setEditable((prev) => !prev);
  };
  return (
    <Stack sx={{ width: "100%" }} alignItems="flex-end">
      <Button
        endIcon={<EditIcon />}
        sx={{ textTransform: "none" }}
        color={editable ? "success" : "primary"}
        variant="outlined"
        onClick={handleClick}
        size="small"
      >
        <Typography sx={{ fontFamily: "Nunito" }}>
          {editable ? "Lock Profile" : "Edit Profile"}
        </Typography>
      </Button>
    </Stack>
  );
};

const StudentDetails = () => {
  // params
  const params = useParams();

  const [studentProfile, setStudentProfile] = useState({});

  useEffect(() => {
    axios
      .get("/getStudentProfile", {
        params: {
          studentId: params.value,
        },
      })
      .then((res) => {
        setStudentProfile(res.data);
      })
      .catch((err) => {});
  }, []);

  // form states
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    personalEmail: "",
    enrollmentNo: "",
    courseId: "",
    departmentId: "",
    passingYear: "",
    phoneNo: "",
    altPhoneNo: "",
    photo: "",
    linkedin: "",
    isParticipatingInPlacements: true,
    graduationGrades: {},
    cgpaGrades: {},
    highSchoolGrades: {},
    intermediateGrades: {},
  });
  const [department, setDepartment] = useState([]);
  const [course, setCourse] = useState([]);
  const [departmentLoad, setDepartmentLoad] = useState(false);
  const [courseLoad, setCourseLoad] = useState(false);
  const [updateLoad, setUpdateLoad] = useState(false);
  const [open, setOpen] = useState(false);

  // education details states
  const sems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [cgpagrades, setCGPAGrades] = useState({
    semester1: formData?.cgpaGrades?.semester1 || 0,
    semester2: formData?.cgpaGrades?.semester2 || 0,
    semester3: formData?.cgpaGrades?.semester3 || 0,
    semester4: formData?.cgpaGrades?.semester4 || 0,
    semester5: formData?.cgpaGrades?.semester5 || 0,
    semester6: formData?.cgpaGrades?.semester6 || 0,
    semester7: formData?.cgpaGrades?.semester7 || 0,
    semester8: formData?.cgpaGrades?.semester8 || 0,
    semester9: formData?.cgpaGrades?.semester9 || 0,
    semester10: formData?.cgpaGrades?.semester10 || 0,
  });
  const [graduationgrades, setGraduationgrades] = useState({
    grade: formData?.graduationGrades?.grade || 0,
    gradeType: formData?.graduationGrades?.gradeType || "",
  });
  const [highSchoolgrades, setHighSchoolgrades] = useState({
    grade: formData?.highSchoolGrades?.grade || 0,
    gradeType: formData?.highSchoolGrades?.gradeType || "",
  });
  const [intermediategrades, setIntermediategrades] = useState({
    grade: formData?.intermediateGrades?.grade || 0,
    gradeType: formData?.intermediateGrades?.gradeType || "",
  });

  const handlecgpaGradesChange = (e) => {
    setCGPAGrades({ ...cgpagrades, [e.target.name]: e.target.value });
    setFormData({
      ...formData,
      cgpaGrades: {
        ...formData.cgpaGrades,
        [e.target.name]: Number(e.target.value),
      },
    });
  };

  // handle field change
  const handleGraduationGradesChange = (e) => {
    setGraduationgrades({ ...graduationgrades, [e.target.name]: e.target.value });
    setFormData({
      ...formData,
      graduationGrades: {
        ...formData.graduationGrades,
        [e.target.name]: Number(e.target.value),
      },
    });
  };

  const handlehighSchoolgradeChange = (e) => {
    setHighSchoolgrades({ ...highSchoolgrades, [e.target.name]: e.target.value });
    setFormData({
      ...formData,
      highSchoolGrades: {
        ...formData.highSchoolGrades,
        [e.target.name]: Number(e.target.value),
      },
    });
  };
  const handleIntermediategradeChange = (e) => {
    setIntermediategrades({ ...intermediategrades, [e.target.name]: e.target.value });
    setFormData({
      ...formData,
      intermediateGrades: {
        ...formData.intermediateGrades,
        [e.target.name]: Number(e.target.value),
      },
    });
  };

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
        setCourseLoad(false);
      })
      .catch((err) => {
        setCourseLoad(true);
      });
  }, []);

  useEffect(() => {
    setDepartment([]);
    setDepartmentLoad(true);
    axios
      .get("/getDepartmentList", { params: { courseId: formData.courseId } })
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
  }, [formData.courseId]);

  // update
  useEffect(() => {
    if (studentProfile) {
      setFormData({
        name: studentProfile.name || "",
        gender: studentProfile.gender || "",
        personalEmail: studentProfile.personalEmail || "",
        enrollmentNo: studentProfile.enrollmentNo || "",
        courseId: studentProfile.courseId || "",
        departmentId: studentProfile.departmentId || "",
        passingYear: studentProfile.passingYear || "",
        phoneNo: studentProfile.phoneNo || "",
        altPhoneNo: studentProfile.altPhoneNo || "",
        photo: studentProfile.photo || "",
        linkedin: studentProfile.linkedin || "",
        graduationGrades: studentProfile.graduationGrades || {},
        cgpaGrades: studentProfile.cgpaGrades || {},
        intermediateGrades: studentProfile.intermediateGrades || {},
        highSchoolGrades: studentProfile.highSchoolGrades || {},
        isParticipatingInPlacements: studentProfile.isParticipatingInPlacements || true,
      });
      setCGPAGrades({
        semester1: studentProfile?.cgpaGrades?.semester1 || 0,
        semester2: studentProfile?.cgpaGrades?.semester2 || 0,
        semester3: studentProfile?.cgpaGrades?.semester3 || 0,
        semester4: studentProfile?.cgpaGrades?.semester4 || 0,
        semester5: studentProfile?.cgpaGrades?.semester5 || 0,
        semester6: studentProfile?.cgpaGrades?.semester6 || 0,
        semester7: studentProfile?.cgpaGrades?.semester7 || 0,
        semester8: studentProfile?.cgpaGrades?.semester8 || 0,
        semester9: studentProfile?.cgpaGrades?.semester9 || 0,
        semester10: studentProfile?.cgpaGrades?.semester10 || 0,
      });
      setGraduationgrades({
        grade: studentProfile?.graduationGrades?.grade || 0,
        gradeType: studentProfile?.graduationGrades?.gradeType || "",
      });
      setHighSchoolgrades({
        grade: studentProfile?.highSchoolGrades?.grade || 0,
        gradeType: studentProfile?.highSchoolGrades?.gradeType || "",
      });
      setIntermediategrades({
        grade: studentProfile?.intermediateGrades?.grade || 0,
        gradeType: studentProfile?.intermediateGrades?.gradeType || "",
      });
    }
  }, [studentProfile]);

  const handleUpdateProfile = () => {
    setUpdateLoad(true);
    axios
      .post("/updateStudentProfile", { ...formData, studentId: params.value })
      .then((res) => {
        setOpen(true);
        setUpdateLoad(false);
        setEditable(false);
      })
      .catch((err) => {
        setUpdateLoad(false);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%", padding: "15px 24px" }} alignItems="center">
      <StudentPhoto photoURL={formData.photo} name={formData.name} />
      <Chip
        label={studentProfile?.collegeEmail}
        sx={{ fontFamily: "Nunito", maxWidth: 400 }}
        color="success"
        variant="outlined"
        icon={<VerifiedIcon color="success" fontSize="small" />}
      />
      <EditButton editable={editable} setEditable={setEditable} />
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Typography variant="h5" color="text.secondary" sx={{ fontFamily: "Nunito" }}>
          Student Details
        </Typography>
        <StudentFormTextField
          formData={formData}
          setFormData={setFormData}
          name="name"
          value={formData.name}
          isNecessary={true}
          label="Name"
          editable={editable}
          helpTxt="Your Full Name as per documents"
        />
        <StudentFormTextField
          formData={formData}
          setFormData={setFormData}
          name="gender"
          value={formData.gender}
          isNecessary={true}
          label="Gender"
          editable={editable}
          helpTxt="Please Specify your Gender"
          type="select"
          selectItems={[
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
            { label: "Other", value: "Other" },
          ]}
        />
        <StudentFormTextField
          formData={formData}
          setFormData={setFormData}
          name="enrollmentNo"
          value={formData.enrollmentNo}
          isNecessary={true}
          label="Enrollment Number"
          editable={editable}
          helpTxt="Your college enrollment number"
        />
        {course.length && (
          <StudentFormTextField
            formData={formData}
            setFormData={setFormData}
            name="courseId"
            value={formData.courseId}
            label="Course"
            isNecessary={true}
            helpTxt="Please Select Your Course"
            type="select"
            selectItems={course}
            loading={courseLoad}
            editable={editable}
          />
        )}
        {department.length && (
          <StudentFormTextField
            formData={formData}
            setFormData={setFormData}
            name="departmentId"
            value={formData.departmentId}
            label="Department"
            isNecessary={true}
            helpTxt="Please Select the Department of your Course"
            type="select"
            selectItems={department}
            loading={departmentLoad}
            editable={editable}
          />
        )}
        <StudentFormTextField
          formData={formData}
          setFormData={setFormData}
          name="passingYear"
          value={formData.passingYear}
          label="Passing Year"
          isNecessary={true}
          helpTxt="Please Provide your passing year"
          type="select"
          editable={editable}
          selectItems={getPassingYears()}
        />
      </Stack>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Typography variant="h5" color="text.secondary" sx={{ fontFamily: "Nunito" }}>
          Education Details
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Semester Grades
        </Typography>
        <Grid container spacing={1}>
          {sems.map((sem) => (
            <Grid item key={sem}>
              <TextField
                size="small"
                name={`semester${sem}`}
                value={cgpagrades?.[`semester${sem}`]}
                onChange={handlecgpaGradesChange}
                disabled={!editable}
                label={`Grade Obtained in Semester-${sem}`}
                variant="standard"
                type="number"
              />
            </Grid>
          ))}
        </Grid>
        <Typography variant="body1" color="text.secondary">
          High School Details
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl sx={{ minWidth: 300 }} size="small" disabled={!editable} variant="standard">
            <InputLabel htmlFor="highschoolGrades">High School (Class 10)</InputLabel>
            <Select
              id="highschoolGrades"
              label="High School Grade Type"
              name="gradeType"
              onChange={handlehighSchoolgradeChange}
              value={highSchoolgrades.gradeType}
              size="small"
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="PERCENTAGE">Percentage</MenuItem>
              <MenuItem value="CGPA">CGPA</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size="small"
            name="grade"
            value={highSchoolgrades.grade}
            onChange={handlehighSchoolgradeChange}
            disabled={!editable}
            label="Enter Number Only"
            variant="standard"
            type="number"
          />
        </Stack>
        <Typography variant="body1" color="text.secondary">
          Intermediate Details
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl sx={{ minWidth: 300 }} size="small" disabled={!editable} variant="standard">
            <InputLabel htmlFor="intermediateGrades">Intermediate (Class 12)</InputLabel>
            <Select
              id="intermediateGrades"
              label="Intermediate Grade Type"
              name="gradeType"
              onChange={handleIntermediategradeChange}
              value={intermediategrades.gradeType}
              size="small"
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="PERCENTAGE">Percentage</MenuItem>
              <MenuItem value="CGPA">CGPA</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size="small"
            name="grade"
            value={intermediategrades.grade}
            onChange={handleIntermediategradeChange}
            disabled={!editable}
            label="Enter Number Only"
            variant="standard"
            type="number"
          />
        </Stack>
        <Typography variant="body1" color="text.secondary">
          Graduation Details (Post Graduates Only)
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl sx={{ minWidth: 300 }} size="small" disabled={!editable} variant="standard">
            <InputLabel htmlFor="graduationGrades">Graduation Grades (M.Tech Only)</InputLabel>
            <Select
              id="graduationGrades"
              label="Graduation Grades (M.Tech Only)"
              name="gradeType"
              onChange={handleGraduationGradesChange}
              value={graduationgrades.gradeType}
              size="small"
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="PERCENTAGE">Percentage</MenuItem>
              <MenuItem value="CGPA">CGPA</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size="small"
            name="grade"
            value={graduationgrades.grade}
            onChange={handleGraduationGradesChange}
            disabled={!editable}
            label="Enter Number Only"
            variant="standard"
            type="number"
          />
        </Stack>
      </Stack>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Typography variant="h5" color="text.secondary" sx={{ fontFamily: "Nunito" }}>
          Contact Details
        </Typography>
        <StudentFormTextField
          formData={formData}
          setFormData={setFormData}
          name="phoneNo"
          value={formData.phoneNo}
          label="Phone Number"
          isNecessary={true}
          editable={editable}
          helpTxt="Your Primary 10 digit Phone Number | eg : 8678912345"
          type="number/text"
        />
        <StudentFormTextField
          formData={formData}
          setFormData={setFormData}
          name="altPhoneNo"
          value={formData.altPhoneNo}
          label="Alternate Phone Number"
          isNecessary={true}
          editable={editable}
          helpTxt="your alternate phone number | eg : 8678912345"
          type="number/text"
        />
        <StudentFormTextField
          formData={formData}
          setFormData={setFormData}
          name="personalEmail"
          value={formData.personalEmail}
          isNecessary={true}
          label="Personal Email"
          editable={editable}
          helpTxt="Please provide your personal Email Id"
        />
        <StudentFormTextField
          formData={formData}
          setFormData={setFormData}
          name="linkedin"
          value={formData.linkedin}
          isNecessary={false}
          label="Linkedin Profile"
          editable={editable}
          helpTxt="Please provide link to your linkedin Profile"
        />
      </Stack>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Typography variant="h5" color="text.secondary" sx={{ fontFamily: "Nunito" }}>
          Placement Session Participation
        </Typography>
        <StudentFormTextField
          formData={formData}
          setFormData={setFormData}
          name="isParticipatingInPlacements"
          value={formData.isParticipatingInPlacements}
          label="Participating in Placements"
          type="select"
          selectItems={[
            { label: "YES", value: true },
            { label: "NO", value: false },
          ]}
          helpTxt="Are you willing to participate in placements"
          editable={editable}
        />
      </Stack>
      <Button
        startIcon={<UpdateIcon />}
        disabled={!editable || updateLoad}
        endIcon={updateLoad ? <CircularProgress size={12} color="inherit" /> : null}
        onClick={handleUpdateProfile}
        variant="outlined"
      >
        Update Profile
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Profile Updated Successfully!
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default StudentDetails;
