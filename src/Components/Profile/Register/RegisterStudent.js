// Hooks
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../Context/userContext";
import { useNavigate } from "react-router-dom";

// API
import axios from "../../../axios";

// MUI Components
import { Stack, Alert, Typography, Divider } from "@mui/material";
import { Button, CircularProgress } from "@mui/material";

// MUI Icons
import RegisterIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import GenderIcon from "@mui/icons-material/Wc";
import EnrollmentIcon from "@mui/icons-material/ConfirmationNumber";
import CallIcon from "@mui/icons-material/Call";
import AltCallIcon from "@mui/icons-material/AddIcCall";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import DriveIcon from "@mui/icons-material/AddToDrive";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SchoolIcon from "@mui/icons-material/School";

// custom components
import RegisterTextField from "./RegisterTextField";

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

const RegisterStudent = () => {
  // user context
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  // States
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
    resumeLink: "",
    linkedin: "",
    maxCTCOffered: "",
    photo: "",
    aadhar: "",
    PAN: "",
    isParticipatingInPlacements: true,
  });
  const [department, setDepartment] = useState([]);
  const [course, setCourse] = useState([]);
  const [departmentLoad, setDepartmentLoad] = useState(false);
  const [courseLoad, setCourseLoad] = useState(false);
  const [registerLoad, setRegisterLoad] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setCourseLoad(true);
    axios
      .get("/getCourseList")
      .then((res) => {
        let tmp = [];
        res.data.courses.map((currCourse) => {
          tmp = [...tmp, { label: currCourse.courseName, value: currCourse._id }];
        });
        setCourse(tmp);
        setCourseLoad(false);
      })
      .catch((err) => {
        setCourseLoad(true);
      });
  }, []);

  useEffect(() => {
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

  const handleRegister = () => {
    setRegisterLoad(true);
    axios
      .post("/studentRegister", {
        ...formData,
        phoneNo: Number(formData.phoneNo),
        altPhoneNo: Number(formData.altPhoneNo),
      })
      .then((res) => {
        setUser({ ...user, roles: [...user.roles, "STUDENT"] });
        setRegisterLoad(false);
        navigate("/");
      })
      .catch((err) => {
        // console.log(err.response.data);
        setErrors(err.response.data.errors);
        setRegisterLoad(false);
      });
  };

  useEffect(() => {
    if (user && user.roles.includes("STUDENT")) navigate(-1);
    if (!user) navigate("/Login");
  }, []);

  return (
    <Stack
      sx={{ minHeight: "calc(100vh - 64px)", width: "100%", paddingBottom: "15px" }}
      spacing={2}
      alignItems="center"
    >
      <Alert severity="info" sx={{ padding: "0 10px", width: "100%" }}>
        <Typography component="span" color="error">
          (*)
        </Typography>
        &nbsp;Fields are Necessary
      </Alert>
      <Typography variant="h4" color="text.secondary" sx={{ fontFamily: "Nunito" }}>
        Register As Student
      </Typography>
      <Divider flexItem orientation="horizontal" />
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <RegisterTextField
            formData={formData}
            setFormData={setFormData}
            icon={<PersonIcon fontSize="small" />}
            name="name"
            value={formData.name}
            label="Full Name"
            isNecessary={true}
            helpTxt=" "
            error={!!errors.find((e) => e.param === "name")}
            errorMsg={errors.find((e) => e.param === "name")?.error}
          />
          <RegisterTextField
            formData={formData}
            setFormData={setFormData}
            icon={<EmailIcon fontSize="small" />}
            name="personalEmail"
            value={formData.personalEmail}
            label="Personal Email"
            isNecessary={true}
            helpTxt=" "
            error={!!errors.find((e) => e.param === "personalEmail")}
            errorMsg={errors.find((e) => e.param === "personalEmail")?.error}
          />
          <RegisterTextField
            formData={formData}
            setFormData={setFormData}
            icon={<GenderIcon fontSize="small" />}
            name="gender"
            type="select"
            value={formData.gender}
            label="Gender"
            isNecessary={true}
            selectItems={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
              { label: "Other", value: "other" },
            ]}
            helpTxt=" "
            error={!!errors.find((e) => e.param === "gender")}
            errorMsg={errors.find((e) => e.param === "gender")?.error}
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <RegisterTextField
            formData={formData}
            setFormData={setFormData}
            icon={<EnrollmentIcon fontSize="small" />}
            name="enrollmentNo"
            value={formData.enrollmentNo}
            label="Enrollment Number"
            isNecessary={true}
            helpTxt=" "
            error={!!errors.find((e) => e.param === "enrollmentNo")}
            errorMsg={errors.find((e) => e.param === "enrollmentNo")?.error}
          />
          <RegisterTextField
            formData={formData}
            setFormData={setFormData}
            icon={<CalendarIcon fontSize="small" />}
            name="passingYear"
            value={formData.passingYear}
            label="Passing Year"
            isNecessary={true}
            helpTxt=" "
            type="select"
            selectItems={getPassingYears()}
            error={!!errors.find((e) => e.param === "passingYear")}
            errorMsg={errors.find((e) => e.param === "passingYear")?.error}
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <RegisterTextField
            formData={formData}
            setFormData={setFormData}
            icon={<SchoolIcon fontSize="small" />}
            name="courseId"
            value={formData.courseId}
            label="Course"
            isNecessary={true}
            helpTxt=" "
            type="select"
            selectItems={course}
            loading={courseLoad}
            error={!!errors.find((e) => e.param === "courseId")}
            errorMsg={errors.find((e) => e.param === "courseId")?.error}
          />
          <RegisterTextField
            formData={formData}
            setFormData={setFormData}
            icon={<SchoolIcon fontSize="small" />}
            name="departmentId"
            value={formData.departmentId}
            label="Department"
            isNecessary={true}
            helpTxt=" "
            type="select"
            selectItems={department}
            loading={departmentLoad}
            error={!!errors.find((e) => e.param === "departmentId")}
            errorMsg={errors.find((e) => e.param === "departmentId")?.error}
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <RegisterTextField
            formData={formData}
            setFormData={setFormData}
            icon={<CallIcon fontSize="small" />}
            name="phoneNo"
            value={formData.phoneNo}
            label="Phone Number"
            isNecessary={true}
            helpTxt="eg : 8678912345"
            type="number/text"
            error={!!errors.find((e) => e.param === "phoneNo")}
            errorMsg={errors.find((e) => e.param === "phoneNo")?.error}
          />
          <RegisterTextField
            formData={formData}
            setFormData={setFormData}
            icon={<AltCallIcon fontSize="small" />}
            name="altPhoneNo"
            value={formData.altPhoneNo}
            label="Alternate Phone Number"
            isNecessary={true}
            helpTxt="eg : 8678912345"
            type="number/text"
            error={!!errors.find((e) => e.param === "altPhoneNo")}
            errorMsg={errors.find((e) => e.param === "altPhoneNo")?.error}
          />
        </Stack>

        <RegisterTextField
          formData={formData}
          setFormData={setFormData}
          icon={<LinkedInIcon fontSize="small" />}
          name="linkedin"
          value={formData.linkedin}
          label="LinkedIn"
          helpTxt="LinkedIn Profile Link"
        />
        <RegisterTextField
          formData={formData}
          setFormData={setFormData}
          icon={<DriveIcon fontSize="small" />}
          name="resumeLink"
          value={formData.resumeLink}
          label="Resume Link"
          helpTxt="Please Provide Google Drive Resume Link with Access to Anyone"
        />
        <RegisterTextField
          formData={formData}
          setFormData={setFormData}
          icon={<DriveIcon fontSize="small" />}
          name="photo"
          value={formData.photo}
          label="Photo"
          helpTxt="Please Provide Google Drive Photo Link with Access to Anyone"
        />
        <RegisterTextField
          formData={formData}
          setFormData={setFormData}
          icon={<DriveIcon fontSize="small" />}
          name="aadhar"
          value={formData.aadhar}
          label="Aadhar"
          helpTxt="Please Provide Google Drive Aadhar Card Photo Link with Access to Anyone"
        />
        <RegisterTextField
          formData={formData}
          setFormData={setFormData}
          icon={<DriveIcon fontSize="small" />}
          name="PAN"
          value={formData.PAN}
          label="PAN"
          helpTxt="Please Provide Google Drive PAN Card Photo Link with Access to Anyone"
        />
        <RegisterTextField
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
        />
      </Stack>
      <Divider flexItem orientation="horizontal" />
      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ maxWidth: 450, textTransform: "none" }}
        startIcon={<RegisterIcon />}
        onClick={handleRegister}
        disabled={registerLoad}
        endIcon={registerLoad ? <CircularProgress size={12} /> : null}
      >
        Register
      </Button>
    </Stack>
  );
};

export default RegisterStudent;
