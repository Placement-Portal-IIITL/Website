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
  "& p": { fontFamily: "Nunito", fontWeight: 600 },
  "& input": { fontFamily: "Nunito", fontSize: "12px" },
  "& svg": { marginBottom: "4px" },
};

const getdocName = (docName) => {
  return docName === "Photo" ? "photo" : docName === "Aadhar" ? "aadhar" : docName;
};

const UpdateResume = ({ setUrl, url, docName, setAadhar, setPan, setPhoto, setStudentProfile }) => {
  // update states
  const [disabled, setDisabled] = useState(true);
  const [Loading, setLoading] = useState(false);

  // handle update documents url
  const handleClick = (e) => {
    setLoading(true);
    axios
      .post("/updateStudentProfile", { [getdocName(docName)]: url })
      .then((res) => {
        updateDocLink(docName);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const updateDocLink = (docName) => {
    const name = getdocName(docName);
    if (name === "photo") setPhoto(url);
    else if (name === "PAN") setPan(url);
    else if (name === "aadhar") setAadhar(url);

    setStudentProfile((prev) => {
      return { ...prev, [docName]: url };
    });
  };

  // handle link change
  const handleChange = (e) => {
    setUrl(e.target.value);
    setDisabled(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%", flexGrow: 1, padding: "15px 24px" }}>
      <TextField
        size="small"
        variant="standard"
        label="Google Drive Link"
        onChange={handleChange}
        name="link"
        fullWidth
        value={url}
        sx={Style}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <GoogleDriveIcon color="primary" fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      <Button
        startIcon={<UpdateIcon />}
        endIcon={Loading ? <CircularProgress size={12} /> : null}
        variant="outlined"
        color="primary"
        size="small"
        onClick={handleClick}
        disabled={disabled}
        sx={{ maxWidth: 300, textTransform: "none" }}
      >
        Update {docName} Link
      </Button>
    </Stack>
  );
};

export default UpdateResume;
