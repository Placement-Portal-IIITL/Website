import { useState, useEffect } from "react";

// api
import axios from "../../../axios";

// MUI Components
import { Stack, TextField, Button } from "@mui/material";
import { CircularProgress } from "@mui/material";

// MUI Icons
import UpdateIcon from "@mui/icons-material/Upload";

const getdocName = (docName) => {
  return docName === "Photo" ? "photo" : docName === "Aadhar" ? "aadhar" : docName;
};

const UpdateResume = ({ setUrl, url, docName, setAadhar, setPan, setPhoto }) => {
  // update states
  const [link, setLink] = useState(url);
  const [disabled, setDisabled] = useState(true);
  const [Loading, setLoading] = useState(false);

  // handle update resume link
  const handleClick = (e) => {
    setLoading(true);
    axios
      .post("/updateStudentProfile", { [e.target.name]: link })
      .then((res) => {
        setUrl(link);
        updateDocLink(docName);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const updateDocLink = (docName) => {
    const name = getdocName(docName);
    if (name === "photo") setPhoto(link);
    else if (name === "PAN") setPan(link);
    else if (name === "aadhar") setAadhar(link);
  };

  // handle link change
  const handleChange = (e) => {
    setLink(e.target.value);
    setDisabled(false);
  };

  useEffect(() => {
    setLink(url);
  }, [url]);

  return (
    <Stack spacing={2} sx={{ width: "100%", maxWidth: 600 }}>
      <TextField
        size="small"
        variant="standard"
        label="Google Drive Link"
        onChange={handleChange}
        name="link"
        fullWidth
        value={link}
        sx={{
          "& label": { fontFamily: "Nunito" },
          "& p": { fontFamily: "Nunito", fontWeight: 600 },
          "& input": { fontFamily: "Nunito", fontSize: "12px" },
        }}
      />
      <Button
        startIcon={<UpdateIcon />}
        endIcon={Loading ? <CircularProgress size={12} color="inherit" /> : null}
        variant="outlined"
        color="primary"
        size="small"
        onClick={handleClick}
        disabled={disabled}
        sx={{ maxWidth: 300 }}
        name={getdocName(docName)}
      >
        Update {docName} Link
      </Button>
    </Stack>
  );
};

export default UpdateResume;
