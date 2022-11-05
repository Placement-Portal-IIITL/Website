import { useState, useEffect } from "react";

// API
import axios from "../../../axios";

// MUI Components
import { Stack, CircularProgress, Alert } from "@mui/material";
import { Avatar, Paper, Typography, Chip } from "@mui/material";

// MUI Icons
import PhotoIcon from "@mui/icons-material/Face6";
import CheckIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

// Components
import Download from "./DocumentDownload";
import View from "./DocumentPreview";
import Update from "./DocumentUpdate";

const Documents = () => {
  // documents states
  const [aadhar, setAadhar] = useState("");
  const [pan, setPan] = useState("");
  const [photo, setPhoto] = useState("");
  const [url, setUrl] = useState("");
  const [currDoc, setCurrDoc] = useState("Photo");
  const [Loading, setLoading] = useState(false);

  const getDocuments = async () => {
    setLoading(true);
    axios
      .get("/getStudentProfile")
      .then((res) => {
        // console.log(res.data);
        setAadhar(res.data.aadhar);
        setPan(res.data.PAN);
        setPhoto(res.data.photo);
        if (currDoc === "Photo") setUrl(res.data.photo);
        else if (currDoc === "Aadhar") setUrl(res.data.aadhar);
        else if (currDoc === "PAN") setUrl(res.data.PAN);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data);
      });
  };

  // fetch resume link
  useEffect(() => {
    getDocuments();
  }, [aadhar, pan, photo]);

  // documents view box
  const DocBox = ({ src, docName, docURL }) => {
    const handleClick = () => {
      setUrl(docURL);
      setCurrDoc(docName);
    };
    return (
      <Paper
        sx={{ padding: "15px 24px", cursor: "pointer" }}
        elevation={currDoc === docName ? 5 : 1}
        onClick={handleClick}
      >
        <Stack direction="row" spacing={2} justifyContent="space-evenly" alignItems="center">
          <Avatar src={src} alt={docName} sx={{ height: 60, width: 60 }} />
          <Stack spacing={1}>
            <Typography variant="h6" color="text.secondary" sx={{ fontFamily: "Nunito" }}>
              {docName}
            </Typography>
            {docURL.length ? (
              <Chip
                size="small"
                label="Added"
                color="success"
                icon={<CheckIcon />}
                variant="outlined"
              />
            ) : (
              <Chip
                size="small"
                label="Missing"
                color="error"
                icon={<CancelIcon />}
                variant="outlined"
              />
            )}
          </Stack>
        </Stack>
      </Paper>
    );
  };
  return (
    <Stack sx={{ minHeight: "calc(100vh - 64px)", width: "100%" }}>
      {Loading && (
        <Stack
          sx={{ padding: "15px 24px", width: "100%" }}
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Stack>
      )}
      {!Loading && (
        <>
          <Alert severity="info">Make Sure Your Google Drive Link is publically accessible</Alert>
          <Stack spacing={2} sx={{ width: "100%", padding: "15px 24px" }}>
            <Typography variant="h5" color="text.secondary">
              Your Documents
            </Typography>
            <Stack
              direction="row"
              sx={{ width: "100%" }}
              justifyContent="space-evenly"
              alignItems="center"
            >
              <DocBox src="/images/userImg.png" docName="Photo" docURL={photo} />
              <DocBox src="/images/aadhar.png" docName="Aadhar" docURL={aadhar} />
              <DocBox src="/images/pan.png" docName="PAN" docURL={pan} />
            </Stack>
            <Stack
              direction="row"
              sx={{ width: "100%" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Update
                setUrl={setUrl}
                url={url}
                docName={currDoc}
                setAadhar={setAadhar}
                setPan={setPan}
                setPhoto={setPhoto}
              />
              <Download url={url} docName={currDoc} />
            </Stack>
          </Stack>
          <View url={url} docName={currDoc} />
        </>
      )}
    </Stack>
  );
};

export default Documents;
