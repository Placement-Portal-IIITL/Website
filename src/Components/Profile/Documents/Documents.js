import { useState } from "react";

// MUI Components
import { Stack, Alert, Divider } from "@mui/material";
import { Avatar, Paper, Typography, Chip } from "@mui/material";

// MUI Icons
import CheckIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

// Components
import Download from "./DocumentDownload";
import View from "./DocumentPreview";
import Update from "./DocumentUpdate";

const Documents = ({ studentProfile, setStudentProfile }) => {
  // documents states
  const [aadhar, setAadhar] = useState(studentProfile.aadhar || "");
  const [pan, setPan] = useState(studentProfile.PAN || "");
  const [photo, setPhoto] = useState(studentProfile.photo || "");
  const [url, setUrl] = useState(studentProfile.photo || "");

  // states
  const [currDoc, setCurrDoc] = useState("Photo");

  // documents view box
  const DocBox = ({ src, docName, docURL }) => {
    // handle document click
    const handleClick = () => {
      setUrl(docURL);
      setCurrDoc(docName);
    };

    return (
      <Paper
        sx={{
          margin: "15px 0px",
          padding: "15px 24px",
          cursor: "pointer",
          width: "100%",
          border: currDoc === docName ? "2px solid rgba(0,0,255,0.1)" : "2px solid rgba(0,0,0,0)",
        }}
        elevation={currDoc === docName ? 2 : 1}
        onClick={handleClick}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={src} alt={docName} sx={{ height: 80, width: 80 }} />
          <Stack spacing={1}>
            <Typography variant="h6" color="text.secondary" sx={{ fontFamily: "Nunito" }}>
              {docName}
            </Typography>
            {docURL?.length ? (
              <Chip
                size="small"
                label="Added"
                color="success"
                icon={<CheckIcon fontSize="small" />}
                variant="filled"
                sx={{
                  fontFamily: "Nunito",
                  fontSize: "10px",
                }}
              />
            ) : (
              <Chip
                size="small"
                label="Missing"
                color="error"
                icon={<CancelIcon fontSize="small" />}
                variant="outlined"
                sx={{
                  fontFamily: "Nunito",
                  fontSize: "10px",
                }}
              />
            )}
          </Stack>
        </Stack>
      </Paper>
    );
  };

  return (
    <Stack
      sx={{ minHeight: "calc(100vh - 64px)", width: "100%" }}
      divider={<Divider flexItem orientation="horizontal" />}
    >
      <Alert severity="info">Make Sure Your Google Drive Link is publically accessible</Alert>
      <Stack
        sx={{ width: "100%", padding: "0px" }}
        divider={<Divider flexItem orientation="horizontal" />}
      >
        <Typography variant="h5" color="text.secondary" sx={{ padding: "15px 24px" }}>
          Your Documents
        </Typography>
        <Stack
          direction="row"
          sx={{ width: "100%", padding: "0px 24px" }}
          justifyContent="space-evenly"
          alignItems="center"
          divider={<Divider flexItem orientation="vertical" />}
          spacing={2}
        >
          <DocBox src="/images/userImg.png" docName="Photo" docURL={photo} />
          <DocBox src="/images/aadhar.png" docName="Aadhar" docURL={aadhar} />
          <DocBox src="/images/pan.png" docName="PAN" docURL={pan} />
        </Stack>
        <Stack
          direction="row"
          sx={{ width: "100%" }}
          alignItems="center"
          spacing={2}
          divider={<Divider flexItem orientation="vertical" />}
        >
          <Update
            setUrl={setUrl}
            url={url}
            docName={currDoc}
            setAadhar={setAadhar}
            setPan={setPan}
            setPhoto={setPhoto}
            setStudentProfile={setStudentProfile}
          />
          <Download url={url} docName={currDoc} />
        </Stack>
      </Stack>
      <View url={url} docName={currDoc} />
    </Stack>
  );
};

export default Documents;
