// Hooks
import { useState, useEffect } from "react";

// API
import axios from "../../../axios";

// MUI Components
import { Stack, TextField, Button, Typography, CircularProgress, Divider } from "@mui/material";
import { FormGroup, FormControlLabel, Checkbox, MenuItem, Paper } from "@mui/material";

import MDEditor from "@uiw/react-md-editor";

const basicTemplate = `|         Hiring         |    On-Campus     |
| :--------------------: | :--------------: |
|      **Company**       |  _Company Name_  |
|     **Offer Type**     | _6 Months + FTE_ |
|        **Role**        |      _SDE_       |
|        **CTC**         |     _XY LPA_     |
|        **Base**        |     _XY LPA_     |
| **Internship Stipend** |  _xx,000/month_  |
|      **Location**      |     _India_      |

---

### Dates

Tentative OA Date : 

Tentative Interview Date :

### Additional Details
`;

const AddAnouncement = ({ setUpdateFeed }) => {
  // states
  const [feed, setFeed] = useState({
    title: "On-Campus Hiring | Company Name",
    content: "",
    year: 2022,
    courseId: [],
  });
  const [courseList, setCourseList] = useState([]);
  const [sending, setSending] = useState(false);
  const [content, setContent] = useState(basicTemplate);

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
    <Paper elevation={3} sx={{ width: "100%", padding: "15px 24px", borderRadius: "10px" }}>
      <Stack spacing={2} sx={{ bgcolor: "white", width: "100%", padding: "10px 15px" }}>
        <Typography variant="h5" color="primary">
          <strong>New Anouncement</strong>
        </Typography>
        <TextField
          name="title"
          label="Title"
          value={feed.title}
          onChange={handleChange}
          size="small"
        />
        <div className="container">
          <MDEditor
            value={content}
            onChange={setContent}
            data-color-mode="light"
            style={{ minHeight: 300 }}
          />
          <MDEditor.Markdown source={feed.content} style={{ whiteSpace: "pre-wrap" }} />
        </div>
        <TextField
          name="year"
          label="Passing Year"
          select
          value={feed.year}
          onChange={handleChange}
          size="small"
        >
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
              <FormGroup key={course._id} size="small">
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
    </Paper>
  );
};

export default AddAnouncement;
