// Hooks
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

// MUI Components
import { Stack, Paper, Typography } from "@mui/material";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Snackbar, Alert, AlertTitle } from "@mui/material";
import { CircularProgress } from "@mui/material";

// Custom Css
import "./Login.css";

// MUI Icons
import MailIcon from "@mui/icons-material/Mail";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PasswordIcon from "@mui/icons-material/Lock";
import ErrorIcon from "@mui/icons-material/ErrorOutline";

const Login = () => {
  // Login Data States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Loading States
  const [LoginLoad, setLoginLoad] = useState(false);

  // Error States
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setpasswordErrorMsg] = useState("");
  const [defaultError, setDefaultError] = useState(false);

  return (
    <Stack justifyContent="center" alignItems="center" className="Login-container">
      <Stack spacing={4} justifyContent="center" alignItems="center">
        <img src="/logo.png" height="100px" width="auto" alt="Placement Portal IIIT Lucknow" />
        <Paper className="Login-box">
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography textAlign="center" sx={{ fontFamily: "Staatliches" }} variant="h4">
                Welcome
              </Typography>
              <Typography textAlign="center" variant="caption" sx={{ fontFamily: "Nunito" }}>
                Enter your credentials to access Portal
              </Typography>
            </Stack>
            <Stack spacing={1}>
              <TextField
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {!emailError ? (
                        <IconButton>
                          <ErrorIcon color="error" />
                        </IconButton>
                      ) : null}
                    </InputAdornment>
                  ),
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {passwordError ? (
                        <ErrorIcon />
                      ) : showPassword ? (
                        <IconButton>
                          <VisibilityIcon />
                        </IconButton>
                      ) : (
                        <IconButton>
                          <VisibilityOffIcon />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button className="Login-btn" variant="contained">
                Sign In
              </Button>
            </Stack>
            <Typography variant="caption" sx={{ fontFamily: "Nunito" }}>
              Forgot Your Password?{" "}
              <Link to="/Recovery">
                <strong>Reset Password</strong>
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
    </Stack>
  );
};

export default Login;
