import { useState, useEffect } from "react";

// API
import axios from "../../axios";

// Mui Components
import { Stack, TextField, Button } from "@mui/material";
import { CircularProgress, Snackbar, Alert } from "@mui/material";

const ContactForm = () => {
  // Form State
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phoneNo: "",
    message: "",
  });
  const [Loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [queryLoad, setQueryLoad] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/getUserProfile")
      .then((res) => {
        setFormData({ ...formData, name: res.data.name, email: res.data.email });
        setLoading(false);
      })
      .then((err) => {});
  }, []);

  // handle form Data change
  const handleChange = (e) => {
    setErrors([]);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendQuery = () => {
    setQueryLoad(true);
    axios
      .post("/addQuery", formData)
      .then((res) => {
        setOpen(true);
        setQueryLoad(false);
        setAlertType("success");
      })
      .catch((err) => {
        setQueryLoad(false);
        setAlertType("error");
        setErrors(err.response.data.errors);
      });
  };

  return (
    <Stack sx={{ width: "100%", padding: "15px 24px" }}>
      {Loading ? (
        <CircularProgress size={15} />
      ) : (
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <TextField variant="outlined" disabled value={formData.name} label="Your Name" />
            <TextField variant="outlined" disabled value={formData.email} label="Your Email" />
          </Stack>
          <TextField
            variant="outlined"
            value={formData.phoneNo}
            label="Contact Number"
            type="number"
            name="phoneNo"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            multiline
            minRows={5}
            value={formData.message}
            label="Your Message"
            name="message"
            onChange={handleChange}
            helperText={
              errors.find((e) => e.param === "message")?.error
                ? errors.find((e) => e.param === "message")?.error
                : "Please write a detailed message about your query"
            }
            error={!!errors.find((e) => e.param === "message")}
          />
          <div>
            <Button
              variant="outlined"
              color="primary"
              endIcon={queryLoad ? <CircularProgress size={12} /> : null}
              disabled={queryLoad}
              onClick={handleSendQuery}
            >
              Send
            </Button>
          </div>
          <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={(e, reason) => {
              if (reason === "clickaway") return;
              setOpen(false);
            }}
          >
            <Alert onClose={() => setOpen(false)} severity={alertType}>
              Message Sent Successfully
            </Alert>
          </Snackbar>
        </Stack>
      )}
    </Stack>
  );
};
export default ContactForm;
