import { useState } from "react";

// api
import axios from "../../../axios";

// MUI Components
import { Stack, TextField, Button } from "@mui/material";
import { CircularProgress } from "@mui/material";

// MUI Icons
import UpdateIcon from "@mui/icons-material/Upload";

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
        setUrl(link);
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
      >
        Update Resume Link
      </Button>
    </Stack>
  );
};

export default UpdateResume;
