import { useState, useEffect } from "react";

// custom Css
import "./Auth.css";

// MUI Components
import { Stack, Typography } from "@mui/material";

// MUI Icons
import CheckIcon from "@mui/icons-material/CheckCircleOutline";
import CheckedIcon from "@mui/icons-material/CheckCircle";

const Check = ({ Icon, text }) => {
  return (
    <Stack direction="row" spacing={2}>
      {Icon}
      <Typography variant="caption" sx={{ fontFamily: "Nunito", fontSize: "12px" }}>
        {text}
      </Typography>
    </Stack>
  );
};

const PasswordCheck = ({ password, passwordCheck, setPasswordCheck }) => {
  const [checks, setChecks] = useState([false, false, false, false]);

  // checks all password parameters
  const CheckPass = () => {
    let Checks = [false, false, false, false];
    Checks[0] = password.length >= 8;
    Checks[1] = /[A-Z]/.test(password);
    Checks[2] = /[a-z]/.test(password);
    Checks[3] = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);
    setChecks(Checks);
    if (checks[0] && checks[1] && checks[2] && checks[3]) setPasswordCheck(true);
    else setPasswordCheck(false);
    return checks;
  };

  useEffect(() => {
    CheckPass();
  }, [password]);

  return (
    <Stack
      spacing={1}
      className="PasswordCheck"
      sx={{ padding: "5px 10px", borderRadius: "5px", border: "1px solid rgba(0,0,0,0.1)" }}
    >
      <Check
        Icon={checks[0] ? <CheckedIcon color="success" /> : <CheckIcon />}
        text="Atleast 8 characters"
      />
      <Check
        Icon={checks[1] ? <CheckedIcon color="success" /> : <CheckIcon />}
        text="Atleast 1 Uppercase character"
      />
      <Check
        Icon={checks[2] ? <CheckedIcon color="success" /> : <CheckIcon />}
        text="Atleast 1 Lowercase character"
      />
      <Check
        Icon={checks[3] ? <CheckedIcon color="success" /> : <CheckIcon />}
        text="Atleast 1 Special Character"
      />
    </Stack>
  );
};

export default PasswordCheck;
