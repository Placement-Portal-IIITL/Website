import { useState } from "react";

// api
import axios from "../../../axios";

// MUI Components
import { Stack, TextField, Button, InputAdornment } from "@mui/material";
import { CircularProgress } from "@mui/material";

// MUI Icons
import UpdateIcon from "@mui/icons-material/Upload";
import GoogleDriveIcon from "@mui/icons-material/AddToDrive";

const Style = {
  maxWidth: 600,
  "& label": { fontFamily: "Nunito" },
  "& input": { fontFamily: "Nunito", fontSize: "14px" },
};

const UpdateResume = ({ setUrl, url }) => {
  // update states
  const [link, setLink] = useState(url);
  const [disabled, setDisabled] = useState(true);
  const [Loading, setLoading] = useState(false);

  // handle update resume link
  const handleClick = async () => {
    setLoading(true);
    axios
      .post("/updateStudentProfile", { resumeLink: link })
      .then((res) => {
        setUrl((prev) => {
          return { ...prev, resumeLink: link };
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  // handle link change
  const handleChange = (e) => {
    setLink(e.target.value);
    setDisabled(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%", flexGrow: 1, padding: "15px 0px" }}>
      <TextField
        fullWidth
        size="small"
        variant="standard"
        label="Google Drive Link"
        name="link"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <GoogleDriveIcon fontSize="small" color="primary" />
            </InputAdornment>
          ),
        }}
        sx={Style}
        onChange={handleChange}
        value={link}
      />
      <Button
        startIcon={<UpdateIcon />}
        endIcon={Loading ? <CircularProgress size={12} /> : null}
        variant="outlined"
        color="primary"
        size="small"
        sx={{ maxWidth: 300, textTransform: "none" }}
        onClick={handleClick}
        disabled={disabled}
      >
        Update Resume Link
      </Button>
    </Stack>
  );
};

export default UpdateResume;
