// Hooks
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

// MUI Components
import { Stack, Paper, Typography } from "@mui/material";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Snackbar, Alert, AlertTitle } from "@mui/material";
import { CircularProgress } from "@mui/material";

// custom css
import "./Recovery.css";

// MUI Icons
import MailIcon from "@mui/icons-material/Mail";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PasswordIcon from "@mui/icons-material/Lock";
import ErrorIcon from "@mui/icons-material/ErrorOutline";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";

// custom Components
import OTP from "./OTP";
import PasswordCheck from "../PasswordCheck";

// verify email is correct or not
const checkEmail = (email) => {
  if (!email.includes("@")) return false;

  const domainIIITL = "iiitl.ac.in";
  let emailDomain = email.split("@");
  emailDomain = emailDomain[1];

  if (domainIIITL !== emailDomain) return false;
  return true;
};

const Login = () => {
  // calling hooks
  const mailParam = useParams();
  const navigate = useNavigate();

  // Recovery Data States
  const [params, setParams] = useState({
    email: mailParam.email ? mailParam.email : "",
    otp: "",
    password: "",
  });
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);

  // Loading States
  const [LoginLoad, setLoginLoad] = useState(false);
  const [open, setOpen] = useState(false);

  // Error States
  const [validMail, setValidMail] = useState(mailParam.email ? checkEmail(mailParam.email) : false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setpasswordErrorMsg] = useState("");
  const [defaultError, setDefaultError] = useState({ title: "", body: "" });

  // Handle params change
  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      setValidMail(checkEmail(e.target.value));
    }
  };

  // show or hide password
  const togglePassword = (type) => {
    if (type === 0) setShowPassword((prev) => !prev);
    else if (type === 1) setShowVerifyPassword((prev) => !prev);
  };

  // check if mail is valid & password is not empty
  const preCheck = () => {
    return validMail && params.password.length;
  };

  const handleLogin = () => {
    if (preCheck()) {
    } else {
      setOpen(true);
      setDefaultError({
        title: "Fill All Fields",
        body: "Please fill all fields correctly and try again",
      });
    }
  };

  return (
    <Stack justifyContent="center" alignItems="center" className="Recovery-container">
      <Stack spacing={4} justifyContent="center" alignItems="center">
        <img src="/logo.png" height="100px" width="auto" alt="Placement Portal IIIT Lucknow" />
        <Paper className="Recovery-box">
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography textAlign="center" sx={{ fontFamily: "Staatliches" }} variant="h4">
                Recovery
              </Typography>
              <Typography textAlign="center" variant="caption" sx={{ fontFamily: "Nunito" }}>
                Use your institute Mail Id to reset your password
              </Typography>
            </Stack>
            <Stack spacing={2}>
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
                        {emailError ? (
                          <ErrorIcon color="error" />
                        ) : validMail ? (
                          <DoneAllIcon color="success" />
                        ) : (
                          <DoneIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                name="email"
                value={params.email}
                onChange={handleChange}
                helperText={emailError ? emailErrorMsg : "Please Enter Institute Mail Id"}
                error={emailError}
                autoComplete="off"
              />
              <OTP otp={params.otp} email={params.email} />
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
                        {passwordError ? (
                          <ErrorIcon />
                        ) : showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                name="password"
                value={params.password}
                onChange={handleChange}
                helperText={passwordError ? passwordErrorMsg : " "}
                error={passwordError}
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
                        {passwordError ? (
                          <ErrorIcon />
                        ) : showVerifyPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                name="verify-password"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
                autoComplete="off"
              />
              <PasswordCheck password={params.password} />
              <Button
                className="Recovery-btn"
                variant="contained"
                onClick={handleLogin}
                endIcon={LoginLoad ? <CircularProgress color="inherit" size={15} /> : null}
                disabled={LoginLoad}
              >
                Verify
              </Button>
            </Stack>
            <Typography variant="caption" sx={{ fontFamily: "Nunito" }}>
              Already Registered ?{" "}
              <Link to="/Login">
                <strong>Login</strong>
              </Link>
            </Typography>
          </Stack>
        </Paper>
        <Typography variant="body2" sx={{ fontFamily: "Nunito" }}>
          <Link to="/Signup">
            <strong>Create Account Instead</strong>
          </Link>
        </Typography>
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

export default Login;
