import { useState, useContext } from "react";
import { UserContext } from "../../../Context/userContext";
import { useNavigate } from "react-router-dom";

// API
import axios from "../../../axios";

// MUI Components
import { Stack, Button, Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";

// Custom Components
import OTP from "../OTP";

const Verify = ({ email, password }) => {
  // Calling Hooks
  const navigate = useNavigate();

  // user Context
  const [user, setUser] = useContext(UserContext);

  // Data States
  const [otp, setOtp] = useState("");
  const [otpValid, setOtpValid] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  // handle OTP verification
  const handleVerify = () => {
    const verifyURL = "/verifyEmail";
    const verifyParams = { email: email, otp: otp };
    setVerifyLoading(true);
    axios
      .post(verifyURL, verifyParams)
      .then((res) => {
        setVerifyLoading(false);
        handleLogin();
      })
      .catch((err) => {
        setVerifyLoading(false);
      });
  };

  // check roles and redirect accordingly
  const RedirectWithRoles = (roles) => {
    if (roles.includes("STUDENT") || roles.includes("PLACEMENT_TEAM")) {
      navigate("/");
    } else if (roles.includes("TPO")) {
      navigate("/tpo");
    } else {
      navigate("/register");
    }
  };

  // Handle Login post verification
  const handleLogin = () => {
    const LoginURL = "/signIn";
    const params = { email: email, password: password };
    axios
      .post(LoginURL, params)
      .then((res) => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
        setUser({
          authHeader: `Bearer ${res.data.token}`,
          email: email,
          roles: res.data.roles,
          name: res.data.name,
        });
        RedirectWithRoles(res.data.roles);
      })
      .catch((err) => {});
  };

  return (
    <Stack spacing={2}>
      <Typography variant="body2" sx={{ fontFamily: "Nunito", fontWeight: "bold" }} color="primary">
        Please Enter OTP sent to your mail
      </Typography>
      <OTP
        otp={otp}
        setOtp={setOtp}
        email={email}
        setOtpValid={setOtpValid}
        url="/sendVerifyEmailOtp"
      />
      <Button
        onClick={handleVerify}
        className="Signup-btn"
        variant="contained"
        endIcon={verifyLoading ? <CircularProgress color="inherit" size={12} /> : null}
      >
        Verify
      </Button>
    </Stack>
  );
};

export default Verify;
