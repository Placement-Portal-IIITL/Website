// react hooks
import { useState, useEffect } from "react";

// api
import axios from "../../../axios";

// MUI Components
import { Stack, Button, Alert, Snackbar } from "@mui/material";
import { Chip, Typography, CircularProgress } from "@mui/material";

// MUI Icons
import EditIcon from "@mui/icons-material/Edit";
import VerifiedIcon from "@mui/icons-material/Verified";
import UpdateIcon from "@mui/icons-material/Upgrade";

// Components
import StudentPhoto from "./StudentPhoto";
import StudentFormTextField from "./StudentFormTextField";

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
      >
        <Typography sx={{ fontFamily: "Nunito" }}>
          {editable ? "Lock Profile" : "Edit Profile"}
        </Typography>
      </Button>
    </Stack>
  );
};

const StudentUpdateForm = ({ studentProfile }) => {
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
    isParticipatingInPlacements: true,
  });
  const [department, setDepartment] = useState([]);
  const [course, setCourse] = useState([]);
  const [departmentLoad, setDepartmentLoad] = useState(false);
  const [courseLoad, setCourseLoad] = useState(false);
  const [updateLoad, setUpdateLoad] = useState(false);
  const [open, setOpen] = useState(false);

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
        name: studentProfile.name ? studentProfile.name : "",
        gender: studentProfile.gender ? studentProfile.gender : "",
        personalEmail: studentProfile.personalEmail ? studentProfile.personalEmail : "",
        enrollmentNo: studentProfile.enrollmentNo ? studentProfile.enrollmentNo : "",
        courseId: studentProfile.courseId ? studentProfile.courseId : "",
        departmentId: studentProfile.departmentId ? studentProfile.departmentId : "",
        passingYear: studentProfile.passingYear ? studentProfile.passingYear : "",
        phoneNo: studentProfile.phoneNo ? studentProfile.phoneNo : "",
        altPhoneNo: studentProfile.altPhoneNo ? studentProfile.altPhoneNo : "",
        photo: studentProfile.photo ? studentProfile.enrollmentNo : "",
        isParticipatingInPlacements: studentProfile.isParticipatingInPlacements
          ? studentProfile.isParticipatingInPlacements
          : true,
      });
    }
  }, [studentProfile]);

  const handleUpdateProfile = () => {
    console.log(formData);
    setUpdateLoad(true);
    axios
      .post("/updateStudentProfile", formData)
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
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <StudentPhoto photoURL={formData.photo} name={formData.name} />
      <Chip
        label={studentProfile?.collegeEmail}
        sx={{ fontFamily: "Nunito" }}
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

export default StudentUpdateForm;
