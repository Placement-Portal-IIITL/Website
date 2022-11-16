// hooks
import { useState } from "react";

// api
import axios from "../../../axios";

// MUI Components
import { Alert, Avatar, Button, Stack } from "@mui/material";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { TextField, DialogTitle, CircularProgress } from "@mui/material";

// assets
import CopyableText from "../../assets/MicroComponents/copyText";

const DeleteRecruiter = ({ recruiter, open, setOpen, setListChanged }) => {
  // States
  const [value, setValue] = useState("");
  const [deleteLoad, setDeleteLoad] = useState(false);

  // close dialog
  const handleClose = () => {
    setOpen(false);
    setValue("");
  };

  const handleDeleteRecruiter = (recruiterId) => {
    setDeleteLoad(true);
    axios
      .delete("/deleteRecruiter", { data: { recruiterId: recruiterId } })
      .then((res) => {
        setDeleteLoad(false);
        setListChanged(true);
        handleClose();
      })
      .catch((err) => {
        setDeleteLoad(false);
      });
  };
  const ShowText = ({ txt }) => {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        padding="5px 10px"
        sx={{ border: "1px solid rgba(0,0,0,0.2)", borderRadius: "5px", fontFamily: "Nunito" }}
      >
        {txt}
      </Stack>
    );
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-alert-verify"
      aria-describedby="delete-alert-verify-desctiption"
    >
      <DialogTitle id="delete-alert-verify-title">
        Are you sure want to delete Recruiter : {recruiter.firstName + " " + recruiter.lastName} ?
      </DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <Avatar src={recruiter.photo} alt={recruiter.name} sx={{ height: 60, width: 60 }} />
          <Stack direction="row" spacing={1}>
            <ShowText txt={recruiter.firstName + " " + recruiter.lastName} />
            <CopyableText text={recruiter._id} fontSize="14px" />
          </Stack>
          <Stack direction="row" spacing={1}>
            <ShowText txt={recruiter.designation} />
            <ShowText txt={recruiter.gender} />
          </Stack>
          {recruiter.remarks && <ShowText txt={recruiter.remarks} />}
          <Alert severity="error">Action is irreversible</Alert>
          <TextField
            variant="standard"
            value={value}
            onChange={(e) => setValue(e.target.value.trim())}
            label="Write DELETE to continue"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="success" variant="outlined" size="small">
          Close
        </Button>
        <Button
          autoFocus
          disabled={value !== "DELETE" || deleteLoad}
          color="error"
          variant="contained"
          onClick={() => handleDeleteRecruiter(recruiter._id)}
          startIcon={deleteLoad ? <CircularProgress size={12} color="inherit" /> : null}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteRecruiter;
