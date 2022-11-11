// Hooks
import { React, useState, useEffect } from "react";

// API
import axios from "../../../axios";

// MUI Components
import { Stack, Typography, TextField, Button, IconButton } from "@mui/material";
import { Dialog, Avatar, CircularProgress, Chip } from "@mui/material";
import { InputAdornment, Tooltip } from "@mui/material";

// MUI Icons
import VerifiedIcon from "@mui/icons-material/Verified";
import NotVerifiedIcon from "@mui/icons-material/Dangerous";

const Loader = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Typography variant="body1" sx={{ fontFamily: "Nunito" }}>
        Loading Recruiter Details...
      </Typography>
      <CircularProgress size={20} />
    </Stack>
  );
};

const RecruiterIntro = ({ name, photo, designation, companyId }) => {
  const [company, setCompany] = useState({});
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("/getCompanyDetails", {
        params: {
          companyId: companyId,
        },
      })
      .then((res) => {
        setCompany(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <Stack
      spacing={2}
      alignItems="center"
      sx={{
        margin: "5px 9px",
        padding: "10px 15px",
        border: "1px solid rgba(0,0,0,0.2)",
        borderRadius: "5px",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={photo} alt={name} sx={{ height: 60, width: 60 }} />
        <Typography variant="body1" sx={{ fontFamily: "Nunito" }}>
          {name}
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: "Nunito" }}>
          {designation}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={company?.logo} alt={company?.name} sx={{ height: 60, width: 60 }} />
        <Typography variant="body1" sx={{ fontFamily: "Nunito" }}>
          {company.name}
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: "Nunito" }}>
          {company.natureOfBusiness}
        </Typography>
      </Stack>
    </Stack>
  );
};

const CustomTextField = ({
  name,
  defaultValue,
  isPrimary,
  isVerified,
  id,
  remarks,
  index,
  currIndex,
  setIndex,
  list,
  setList,
}) => {
  // states
  const [updating, setUpdating] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [primary, setPrimary] = useState(isPrimary);
  const [verified, setVerified] = useState(isVerified);

  // handle value change
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // handle value update
  const handleUpdate = (url, params) => {
    setUpdating(true);
    // console.log(params);
    axios
      .post(url, params)
      .then((res) => {
        setIndex(-1);
        setUpdating(false);
      })
      .catch((err) => {
        setUpdating(false);
      });
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{ padding: "10px 10px", border: "1px solid rgba(0,0,0,0.3)", borderRadius: "5px" }}
    >
      <TextField
        fullWidth
        size="small"
        variant="standard"
        name={name}
        value={value}
        onChange={handleChange}
        disabled={index !== currIndex}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Chip
                label={primary ? "Primary" : "Not Primary"}
                size="small"
                color={primary ? "success" : "default"}
                sx={{
                  fontSize: "10px",
                  fontFamily: "Nunito",
                  height: "auto",
                  lineHeight: "normal",
                }}
                onClick={() => {
                  if (index === currIndex) {
                    if (name === "email") {
                      handleUpdate("updateRecruiterEmail", {
                        emailId: id,
                        isPrimary: !primary,
                      });
                      setPrimary((prev) => !prev);
                    } else {
                      if (name === "phoneNo") {
                        handleUpdate("updateRecruiterPhoneNo", {
                          phoneNoId: id,
                          isPrimary: !primary,
                        });
                        setPrimary((prev) => !prev);
                      }
                    }
                  }
                }}
              />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={verified ? "Email is Verified" : "Email Not Verified"} arrow>
                <IconButton
                  size="small"
                  color={verified ? "success" : "error"}
                  onClick={() => {
                    if (index === currIndex) {
                      if (name === "email") {
                        handleUpdate("updateRecruiterEmail", {
                          emailId: id,
                          isVerified: !verified,
                        });
                        setVerified((prev) => !prev);
                      } else {
                        if (name === "phoneNo") {
                          handleUpdate("updateRecruiterPhoneNo", {
                            phoneNoId: id,
                            isPrimary: !primary,
                          });
                          setVerified((prev) => !prev);
                        }
                      }
                    }
                  }}
                >
                  {verified ? (
                    <VerifiedIcon fontSize="small" />
                  ) : (
                    <NotVerifiedIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
        sx={{ "& input": { fontFamily: "Nunito", fontSize: "14px" } }}
      />
      <Button
        size="small"
        sx={{ textTransform: "none" }}
        onClick={() => {
          if (index === currIndex) {
            if (name === "email") {
              handleUpdate("updateRecruiterEmail", {
                emailId: id,
                email: value,
                isPrimary: isPrimary,
                isVerified: isVerified,
                remarks: remarks,
              });
            } else {
              if (name === "phoneNo") {
                handleUpdate("updateRecruiterPhoneNo", {
                  phoneNoId: id,
                  phoneNo: value,
                  isPrimary: isPrimary,
                  isVerified: isVerified,
                  remarks: remarks,
                });
              }
            }
          } else setIndex(index);
        }}
        startIcon={updating ? <CircularProgress size={12} color="inherit" /> : null}
        disabled={updating}
      >
        {index === currIndex ? "Update" : "Edit"}
      </Button>
    </Stack>
  );
};

const RecruiterEmails = ({ mails, setMails, emailIndex, setEmailIndex }) => {
  return (
    <Stack spacing={1}>
      <Typography variant="body1" sx={{ fontFamily: "Nunito" }} color="text.secondary">
        <strong>Emails</strong>
      </Typography>

      {mails &&
        mails.map((mail, idx) => (
          <div key={mail._id}>
            <CustomTextField
              name="email"
              defaultValue={mail.email}
              label="Email"
              isPrimary={mail.isPrimary}
              isVerified={mail.isVerified}
              id={mail._id}
              type="mail"
              remarks={mail.remarks}
              index={idx}
              currIndex={emailIndex}
              setIndex={setEmailIndex}
              list={mails}
              setList={setMails}
            />
          </div>
        ))}
    </Stack>
  );
};

const RecruiterPhoneNos = ({ phoneNos, setPhoneNos, phoneNoIndex, setPhoneNoIndex }) => {
  return (
    <Stack spacing={1}>
      <Typography variant="body1" sx={{ fontFamily: "Nunito" }} color="text.secondary">
        <strong>Contact Number</strong>
      </Typography>
      {phoneNos &&
        phoneNos.map((phoneNo, idx) => (
          <div key={phoneNo._id}>
            <CustomTextField
              name="phoneNo"
              defaultValue={phoneNo.phoneNo}
              isPrimary={phoneNo.isPrimary}
              isVerified={phoneNo.isVerified}
              id={phoneNo._id}
              remarks={phoneNo.remarks}
              index={idx}
              currIndex={phoneNoIndex}
              setIndex={setPhoneNoIndex}
              list={phoneNos}
              setList={setPhoneNos}
            />
          </div>
        ))}
    </Stack>
  );
};

const RecruiterDetails = ({ recruiter, open, setOpen }) => {
  // states
  const [Loading, setLoading] = useState(false);
  const [mails, setMails] = useState([]);
  const [phoneNos, setPhoneNos] = useState([]);
  const [emailIndex, setEmailIndex] = useState(-1);
  const [phoneNoIndex, setPhoneNoIndex] = useState(-1);

  // handle close
  const handleClose = () => {
    setOpen(false);
  };

  const getRecruiterEmails = () => {
    setLoading(true);
    axios
      .get("/getRecruiterEmails", {
        params: {
          recruiterId: recruiter._id,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setMails(res.data);
        getRecruiterPhoneNo();
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
      });
  };

  const getRecruiterPhoneNo = () => {
    axios
      .get("/getRecruiterPhoneNos", {
        params: {
          recruiterId: recruiter._id,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setPhoneNos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (open) getRecruiterEmails();
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="contact-alert-verify"
      aria-describedby="contact-alert-verify-desctiption"
    >
      <RecruiterIntro
        name={recruiter.firstName + " " + recruiter.lastName}
        photo={recruiter.photo}
        designation={recruiter.designation}
        companyId={recruiter.companyId}
      />
      <Stack spacing={1} sx={{ padding: "15px 24px" }}>
        {Loading ? (
          <Loader />
        ) : (
          <Stack spacing={1}>
            <RecruiterEmails
              mails={mails}
              setMails={setMails}
              emailIndex={emailIndex}
              setEmailIndex={setEmailIndex}
            />
            <RecruiterPhoneNos
              phoneNos={phoneNos}
              setPhoneNos={setPhoneNos}
              phoneNoIndex={phoneNoIndex}
              setPhoneNoIndex={setPhoneNoIndex}
            />
          </Stack>
        )}
      </Stack>
    </Dialog>
  );
};

export default RecruiterDetails;
