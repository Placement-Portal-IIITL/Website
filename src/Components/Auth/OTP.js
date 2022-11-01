import { useState } from "react";

// API
import axios from "../../axios";

// MUI Components
import { Stack, TextField, InputAdornment, Button } from "@mui/material";
import { CircularProgress } from "@mui/material";

// Mui Icons
import KeyIcon from "@mui/icons-material/Key";
import CheckedIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/CheckCircleOutline";

// check otp parameters
const checkOtp = (otp) => {
  return otp.length === 6 && /^\d+$/.test(otp);
};

const OTP = ({ otp, setOtp, email, setOtpValid, url }) => {
  const [otpCheck, setOtpCheck] = useState(checkOtp(otp));

  // Loading States
  const [Loading, setLoading] = useState(false);

  // Error States
  const [otpError, setOtpError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // sending otp again to registered mail
  const sendOtp = () => {
    const otpSendURL = url;
    const params = { email: email };
    setLoading(true);
    axios
      .post(otpSendURL, params)
      .then((res) => {
        setSuccessMsg(res.data.msg);
        setLoading(false);
      })
      .catch((err) => {
        setOtpError(true);
        setErrMsg(err.response.data.error);
        setLoading(false);
      });
  };

  return (
    <form noValidate>
      <TextField
        className="OTP-input"
        variant="outlined"
        label="OTP"
        type="text"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Stack direction="row" spacing={1} alignItems="center">
                {otpCheck && <CheckedIcon color="success" />}
                {!otpCheck && <CheckIcon />}
                <Button
                  color="success"
                  variant="outlined"
                  sx={{ textTransform: "none", fontSize: "11px" }}
                  onClick={sendOtp}
                  endIcon={Loading ? <CircularProgress color="inherit" size={9} /> : null}
                >
                  Resend OTP
                </Button>
              </Stack>
            </InputAdornment>
          ),
        }}
        name="OTP-verify"
        value={otp}
        onChange={(e) => {
          setOtp(e.target.value.trim());
          setOtpCheck(checkOtp(e.target.value.trim()));
          setOtpValid(checkOtp(e.target.value.trim()));
        }}
        autoComplete="off"
        helperText={
          otpError
            ? errMsg
            : successMsg.length
            ? successMsg
            : "Enter 6 digit OTP recieved in Registered Mail Id"
        }
        error={otpError}
      />
    </form>
  );
};

export default OTP;
