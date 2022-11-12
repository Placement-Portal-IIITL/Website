// Hooks
import { useState, useEffect } from "react";

// API
import axios from "../../../axios";

// MUI Components
import { Stack, TextField, Button, Typography, CircularProgress } from "@mui/material";
import { FormGroup, FormControlLabel, Checkbox, MenuItem } from "@mui/material";

const AddAnouncement = ({ setUpdateFeed }) => {
  // states
  const [feed, setFeed] = useState({ title: "", content: "", year: 2022, courseId: [] });
  const [courseList, setCourseList] = useState([]);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFeed({ ...feed, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.get("/getCourseList").then((res) => {
      setCourseList(res.data.courses);
    });
  }, []);

  const handleClick = (e) => {
    if (!e.target.checked) {
      setFeed({ ...feed, courseId: feed.courseId.filter((courseId) => courseId !== e.target.id) });
    } else {
      setFeed({ ...feed, courseId: [...feed.courseId, e.target.id] });
    }
  };

  const handleSendFeed = () => {
    setSending(true);
    axios
      .post("/newAnnouncement", feed)
      .then((res) => {
        setSending(false);
        setUpdateFeed((prev) => !prev);
      })
      .catch((err) => {
        setSending(false);
      });
  };

  return (
    <Stack
      spacing={2}
      sx={{ bgcolor: "white", width: 600, padding: "10px 15px", borderRadius: "10px" }}
    >
      <Typography variant="h6" sx={{ fontFamily: "Nunito" }}>
        Add Anouncement
      </Typography>
      <TextField name="title" label="Post Title" value={feed.title} onChange={handleChange} />
      <TextField
        name="content"
        label="Post Content"
        multiline
        minRows={5}
        value={feed.content}
        onChange={handleChange}
      />
      <TextField name="year" label="Passing Year" select value={feed.year} onChange={handleChange}>
        <MenuItem value={2022}>2022</MenuItem>
        <MenuItem value={2023}>2023</MenuItem>
        <MenuItem value={2024}>2024</MenuItem>
        <MenuItem value={2025}>2025</MenuItem>
        <MenuItem value={2026}>2026</MenuItem>
      </TextField>
      <Typography variant="caption">Select Courses Eligible for Anouncement</Typography>
      <Stack>
        {courseList &&
          courseList.map((course) => (
            <FormGroup key={course._id}>
              <FormControlLabel
                control={
                  <Checkbox
                    id={course._id}
                    onChange={handleClick}
                    value={feed.courseId.includes(course._id)}
                  />
                }
                label={course.courseName}
              />
            </FormGroup>
          ))}
      </Stack>
      <Button
        sx={{ width: 100 }}
        variant="outlined"
        color="success"
        endIcon={sending ? <CircularProgress size={12} /> : null}
        disabled={sending}
        onClick={handleSendFeed}
      >
        Send
      </Button>
    </Stack>
  );
};

export default AddAnouncement;
