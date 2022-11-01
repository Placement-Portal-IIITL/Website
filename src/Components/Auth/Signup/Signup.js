// Hooks
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

// API
import axios from "../../../axios";

// MUI Components
import { Stack, Paper, Typography } from "@mui/material";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Snackbar, Alert, AlertTitle } from "@mui/material";
import { CircularProgress } from "@mui/material";

// custom css
import "./Signup.css";

// MUI Icons
import MailIcon from "@mui/icons-material/Mail";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PasswordIcon from "@mui/icons-material/Lock";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import NameIcon from "@mui/icons-material/Person";
import BackIcon from "@mui/icons-material/ArrowBack";

// custom Components
import PasswordCheck from "../PasswordCheck";
import Verify from "./Verify";

// verify email is correct or not
const checkEmail = (email) => {
  if (!email.includes("@")) return false;

  const domainIIITL = "iiitl.ac.in";
  let emailDomain = email.split("@");
  emailDomain = emailDomain[1];

  if (domainIIITL !== emailDomain) return false;
  return true;
};

const Signup = () => {
  // calling hooks
  const Panel = useParams();
  const navigate = useNavigate();

  // Signup Data States
  const [params, setParams] = useState({
    name: "",
    email: Panel.verifyEmail ? Panel.verifyEmail : "",
    password: "",
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [panel, setPanel] = useState(Panel.verifyEmail ? 1 : 0);

  // Loading States
  const [SignupLoad, setSignupLoad] = useState(false);
  const [open, setOpen] = useState(false);

  // Error States
  const [validMail, setValidMail] = useState(false);
  const [defaultError, setDefaultError] = useState({ title: "", body: "" });

  // Handle params change
  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value.trim() });
    if (e.target.name === "email") {
      setValidMail(checkEmail(e.target.value.trim()));
    }
  };

  // show or hide password
  const togglePassword = (type) => {
    if (type === 0) setShowPassword((prev) => !prev);
    else if (type === 1) setShowVerifyPassword((prev) => !prev);
  };

  // check if mail is valid & password is not empty
  const preCheck = () => {
    // iiitl no checked for now
    return params.password.length && (firstName.trim() + " " + lastName.trim()).length > 3;
  };

  // update password
  const handleSignup = () => {
    const signupURL = "/signUp";
    setParams({ ...params, name: firstName.trim() + " " + lastName.trim() });
    setSignupLoad(true);
    if (preCheck()) {
      axios
        .post(signupURL, { ...params, name: firstName.trim() + " " + lastName.trim() })
        .then((res) => {
          setPanel(1);
          navigate(`/Signup/${params.email}`);
          setSignupLoad(false);
        })
        .catch((err) => {
          console.log(err.response.data);
          setSignupLoad(false);
        });
    } else {
      setOpen(true);
      setSignupLoad(false);
      setDefaultError({
        title: "Error",
        body: "Please Fill All Fields Correctly!",
      });
    }
  };

  return (
    <Stack justifyContent="center" alignItems="center" className="Signup-container">
      <Stack spacing={4} justifyContent="center" alignItems="center">
        <img src="/logo.png" height="100px" width="auto" alt="Placement Portal IIIT Lucknow" />
        <Paper className="Signup-box">
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography textAlign="center" sx={{ fontFamily: "Staatliches" }} variant="h4">
                Signup
              </Typography>
              <Typography textAlign="center" variant="caption" sx={{ fontFamily: "Nunito" }}>
                Only use your institute mail to create account
              </Typography>
            </Stack>
            {panel === 0 ? (
              <Stack spacing={2}>
                <Stack spacing={2} direction="row">
                  <TextField
                    variant="outlined"
                    type="text"
                    label="First Name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <NameIcon />
                        </InputAdornment>
                      ),
                    }}
                    name="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="off"
                  />
                  <TextField
                    variant="outlined"
                    label="Last Name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <NameIcon />
                        </InputAdornment>
                      ),
                    }}
                    name="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="off"
                  />
                </Stack>
                <TextField
                  variant="outlined"
                  label="Institute Mail"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          {validMail ? <DoneAllIcon color="success" /> : <DoneIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  name="email"
                  value={params.email}
                  onChange={handleChange}
                  helperText="Please Enter Institute Mail Id"
                  autoComplete="off"
                />
                <TextField
                  variant="outlined"
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => togglePassword(0)}>
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  name="password"
                  value={params.password}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <TextField
                  variant="outlined"
                  label="Confirm New Password"
                  type={showVerifyPassword ? "text" : "password"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => togglePassword(1)}>
                          {showVerifyPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  name="verify-password"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  autoComplete="off"
                  error={verifyPassword.length > 0 && verifyPassword !== params.password}
                  color={
                    params.password.length > 0 && verifyPassword === params.password
                      ? "success"
                      : "primary"
                  }
                  helperText={
                    params.password.length > 0 && verifyPassword === params.password
                      ? "Password Matches"
                      : " "
                  }
                />
                <PasswordCheck
                  password={params.password}
                  passwordCheck={passwordCheck}
                  setPasswordCheck={setPasswordCheck}
                />
                <Button
                  className="Signup-btn"
                  variant="contained"
                  onClick={handleSignup}
                  endIcon={SignupLoad ? <CircularProgress color="inherit" size={12} /> : null}
                  disabled={SignupLoad}
                >
                  Signup
                </Button>
              </Stack>
            ) : (
              <Stack spacing={1}>
                <Button
                  startIcon={<BackIcon />}
                  onClick={() => setPanel(0)}
                  sx={{
                    width: 100,
                    fontSize: "10px",
                    textTransform: "none",
                  }}
                >
                  Go Back
                </Button>
                <Verify email={params.email} password={params.password} />
              </Stack>
            )}

            <Typography variant="caption" sx={{ fontFamily: "Nunito" }}>
              Already Registered ?{" "}
              <Link to="/Login">
                <strong>Login</strong>
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Stack>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={(e, reason) => {
          if (reason === "clickaway") return;
          setOpen(false);
        }}
      >
        <Alert onClose={() => setOpen(false)} severity="error">
          <AlertTitle>
            <strong>{defaultError.title}</strong>
          </AlertTitle>
          {defaultError.body}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Signup;
