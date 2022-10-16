import { useState, useEffect, useContext } from "react";
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

  // sending otp again to registered mail
  const sendOtp = () => {
    const otpSendURL = "";
    const params = { email: email };
    axios
      .post(otpSendURL, params)
      .then((res) => {})
      .catch((err) => {
        // setErrMsg(err.response.data);
      });
  };

  // handle OTP verification
  const handleVerify = () => {
    const verifyURL = "";
    const verifyParams = { email: email, otp: otp };
    console.log(verifyParams);
    setVerifyLoading(true);
    // axios
    //   .post(verifyURL, verifyParams)
    //   .then((res) => {
    //   setVerifyLoading(false);
    //     setVerified(true);
    //   })
    //   .catch((err) => {});
  };

  // useEffect(() => {
  //   sendOtp();
  // }, []);

  // Handle Login post verification
  const handleLogin = () => {
    const LoginURL = "";
    const params = { email: email, password: password };
    axios
      .post(LoginURL, params)
      .then((res) => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
        setUser({
          authHeader: `Bearer ${res.data.token}`,
          email: email,
        });
        navigate("/");
      })
      .catch((err) => {});
  };

  return (
    <Stack spacing={2}>
      <Typography variant="body2" sx={{ fontFamily: "Nunito", fontWeight: "bold" }} color="primary">
        Please Enter OTP sent to your mail
      </Typography>
      <OTP otp={otp} setOtp={setOtp} email={email} setOtpValid={setOtpValid} />
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
