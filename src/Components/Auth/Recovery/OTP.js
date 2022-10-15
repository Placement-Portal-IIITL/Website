import { useState } from "react";

// MUI Components
import { Stack, TextField, InputAdornment, Button } from "@mui/material";

// Mui Icons
import KeyIcon from "@mui/icons-material/Key";
import CheckedIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/CheckCircleOutline";

// check otp parameters
const checkOtp = (otp) => {
  return otp.length === 6 && /^\d+$/.test(otp);
};

const OTP = ({ otp, email }) => {
  const [Otp, setOtp] = useState(otp);
  const [otpCheck, setOtpCheck] = useState(checkOtp(otp));

  return (
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
              >
                Resend Link
              </Button>
            </Stack>
          </InputAdornment>
        ),
      }}
      name="OTP"
      value={Otp}
      onChange={(e) => {
        setOtp(e.target.value);
        setOtpCheck(checkOtp(e.target.value));
      }}
      autoComplete="off"
      helperText="Enter 6 digit OTP recieved in Registered Mail Id"
    />
  );
};

export default OTP;
