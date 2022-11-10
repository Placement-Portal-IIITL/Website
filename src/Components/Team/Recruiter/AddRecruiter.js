import { useState, useEffect, useCallback } from "react";

// API
import axios from "../../../axios";
import { debounce } from "../../../debounce";

//  MUI Components
import { Stack, TextField, Avatar, Button, Divider } from "@mui/material";
import { CircularProgress, Snackbar, Alert, Typography } from "@mui/material";
import { MenuItem, InputAdornment, IconButton } from "@mui/material";

// MUI Icons
import DownIcon from "@mui/icons-material/ArrowDropDownRounded";
import UpIcon from "@mui/icons-material/ArrowDropUpRounded";

const style = {
  minWidth: 400,
  maxWidth: 400,
  "& label": { fontFamily: "Nunito" },
  "& p": { fontFamily: "Nunito", fontWeight: 600 },
  "& input": { fontSize: "14px" },
};

const getRecruiterId = (url) => {
  const tmp = url.split("/");
  const idx = tmp.findIndex((element) => element === "in");
  return tmp[idx + 1];
};

const AddRecruiter = () => {
  // states
  const [scrapperLoad, setScrapperLoad] = useState(false);
  const [scrapperExtraDetails, setScrapperExtraDetails] = useState({
    title: "",
    company: "",
  });
  const [openCompanyList, setOpenCompanyList] = useState(false);
  const [companyListLoad, setCompanyListLoad] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [companies, setCompanies] = useState([]);
  const [addRecruiterLoad, setAddRecruiterLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState([]);
  const [scrapperError, setScrapperError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    linkedIn: "",
    gender: "",
    designation: "",
    companyId: "",
    photo: "",
    remarks: "",
  });

  const runScrapper = () => {
    setScrapperError("");
    const profileId = getRecruiterId(formData.linkedIn);
    if (profileId) {
      setScrapperLoad(true);
      axios
        .get("/scrapUserProfile", {
          params: {
            profileId: profileId,
          },
        })
        .then((res) => {
          setScrapperLoad(false);
          setFormData({
            ...formData,
            firstName: res.data.firstName || formData.firstName,
            lastName: res.data.lastName || formData.lastName,
            designation: res.data.designation || formData.designation,
            linkedIn: res.data.linkedIn || formData.linkedIn,
            photo: res.data.photo || formData.photo,
          });
          setScrapperExtraDetails({ title: res.data.title, company: res.data.company });
        })
        .catch((err) => {
          // console.log(err.response.data);
          setScrapperError("Some error occured!");
          setScrapperLoad(false);
        });
    } else {
      setScrapperError("LinkedIn URL Invalid!");
    }
  };

  const handleAddRecruiter = () => {
    setAddRecruiterLoad(true);
    axios
      .post("/addRecruiter", formData)
      .then((res) => {
        setOpen(true);
        setAddRecruiterLoad(false);
      })
      .catch((err) => {
        setOpen(true);
        setError(err.response.data.error);
        setAddRecruiterLoad(false);
        if (err.response.data.errors) {
          setOpen(false);
          setErrors(err.response.data.errors);
        }
        // console.log(err.response.data);
      });
  };

  // handle form change
  const handleChange = (e) => {
    setScrapperError("");
    setError("");
    setErrors([]);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const searchCompany = async (e) => {
    setCompanyListLoad(true);
    axios
      .get("/searchCompany", {
        params: {
          searchQuery: e.target.value,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setCompanyListLoad(false);
        setOpenCompanyList(true);
        setCompanies(res.data.searchResults);
      })
      .catch((error) => {
        setCompanyListLoad(false);
      });
  };

  const handleDebounceCompanySearch = useCallback(debounce(searchCompany), []);

  return (
    <Stack spacing={1} sx={{ width: "100%", padding: "10px 15px" }}>
      <Typography variant="h6" color="text.secondary">
        Recruiter Photo
      </Typography>
      <Avatar src={formData.photo} alt="Company Logo" sx={{ height: 80, width: 80 }} />
      <Divider orientation="horizontal" flexItem />
      <Typography variant="h6" color="text.secondary">
        Recruiter LinkedIn
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          variant="standard"
          size="small"
          sx={style}
          name="linkedIn"
          onChange={handleChange}
          value={formData.linkedIn}
          label="LinkedIn"
          placeholder="https://www.linkedin.com/in/nikhita/"
          helperText={scrapperError ? scrapperError : "Company Profile LinkedIn URL"}
          error={!!scrapperError}
        />
        <Button
          startIcon={scrapperLoad ? <CircularProgress size={12} color="inherit" /> : null}
          color="primary"
          variant="outlined"
          size="small"
          sx={{ textTransform: "none" }}
          onClick={runScrapper}
        >
          Use Scrapper
        </Button>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        {scrapperExtraDetails.title && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              borderRadius: "5px",
              border: "1px solid rgba(0,0,0,0.2)",
              padding: "5px 10px",
            }}
          >
            {scrapperExtraDetails.title}
          </Typography>
        )}
        {scrapperExtraDetails.company && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              borderRadius: "5px",
              border: "1px solid rgba(0,0,0,0.2)",
              padding: "5px 10px",
            }}
          >
            {"Found Company : " + scrapperExtraDetails.company}
          </Typography>
        )}
      </Stack>
      <Divider orientation="horizontal" flexItem />
      <Typography variant="h6" color="text.secondary">
        Recruiter Details
      </Typography>
      <Stack direction="row" spacing={2}>
        <TextField
          variant="standard"
          size="small"
          sx={style}
          name="firstName"
          onChange={handleChange}
          value={formData.firstName}
          label="First Name"
          placeholder="eg : Abhishek"
          helperText={
            errors.find((e) => e.param === "firstName")?.error
              ? errors.find((e) => e.param === "firstName")?.error
              : "First Name of Recruiter"
          }
          error={!!errors.find((e) => e.param === "firstName")}
        />
        <TextField
          variant="standard"
          size="small"
          sx={style}
          name="lastName"
          onChange={handleChange}
          value={formData.lastName}
          label="Last Name"
          placeholder="eg : Sengar"
          helperText={
            errors.find((e) => e.param === "lastName")?.error
              ? errors.find((e) => e.param === "lastName")?.error
              : "Last Name of Company"
          }
          error={!!errors.find((e) => e.param === "lastName")}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <TextField
          variant="standard"
          size="small"
          sx={style}
          name="photo"
          onChange={handleChange}
          value={formData.photo}
          label="Recruiter Photo"
          helperText="Recruiter Photo URL"
        />
        <TextField
          variant="standard"
          size="small"
          sx={style}
          name="designation"
          onChange={handleChange}
          value={formData.designation}
          label="Recruiter Designation"
          helperText="Recruiter current company designation"
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <TextField
          variant="standard"
          size="small"
          sx={style}
          name="gender"
          onChange={handleChange}
          value={formData.gender}
          label="Gender"
          placeholder="eg : Female"
          helperText="Recruiter Gender"
          select
        >
          <MenuItem value="Male" sx={{ fontSize: "12px" }}>
            Male
          </MenuItem>
          <MenuItem value="Female" sx={{ fontSize: "12px" }}>
            Female
          </MenuItem>
          <MenuItem value="Other" sx={{ fontSize: "12px" }}>
            Other
          </MenuItem>
        </TextField>
        <Stack sx={{ position: "relative" }}>
          <TextField
            variant="standard"
            size="small"
            sx={style}
            fullWidth
            name="companyName"
            value={selectedCompanyName}
            label="Company Name"
            placeholder="eg : Google"
            helperText="Please Select Recruiter Current Company"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setOpenCompanyList((prev) => !prev)}>
                    {openCompanyList ? <UpIcon /> : <DownIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {openCompanyList && (
            <Stack
              sx={{
                position: "absolute",
                left: 0,
                top: "67px",
                zIndex: 1000,
                background: "white",
                border: "1px solid rgba(0,0,0,0.2)",
                padding: "10px 15px",
              }}
            >
              <TextField
                variant="outlined"
                size="small"
                sx={{ ...style, minWidth: 370 }}
                fullWidth
                name="companyName"
                placeholder="eg : Google"
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  handleDebounceCompanySearch(e);
                }}
                value={companyName}
                label="Company Name"
                helperText="Please Select Recruiter Current Company"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {companyListLoad ? <CircularProgress color="inherit" size={12} /> : null}
                    </InputAdornment>
                  ),
                }}
              />
              {companies &&
                companies.map((company) => (
                  <MenuItem
                    key={company._id}
                    value={company._id}
                    name="companyId"
                    onClick={() => {
                      setCompanyName(company.name);
                      setFormData({ ...formData, companyId: company._id });
                      setOpenCompanyList(false);
                      setSelectedCompanyName(company.name);
                    }}
                    sx={{ fontSize: "12px" }}
                  >
                    {company.name}
                  </MenuItem>
                ))}
            </Stack>
          )}
        </Stack>
      </Stack>
      <TextField
        variant="standard"
        size="small"
        sx={{
          minWidth: 300,
          maxWidth: 616,
          "& label": { fontFamily: "Nunito" },
          "& p": { fontFamily: "Nunito", fontWeight: 600 },
          "& input": { fontSize: "14px" },
        }}
        fullWidth
        name="remarks"
        onChange={handleChange}
        value={formData.remarks}
        label="Remarks"
        placeholder="eg : Hiring this year"
        helperText="Any Remarks Regarding Recruiter"
      />

      <Divider orientation="horizontal" flexItem />
      <Button
        variant="outlined"
        color="success"
        startIcon={addRecruiterLoad ? <CircularProgress size={15} color="inherit" /> : null}
        sx={{ width: 300, textTransform: "none" }}
        onClick={handleAddRecruiter}
        disabled={addRecruiterLoad}
      >
        Add Recruiter Details
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error ? "error" : "success"} sx={{ width: "100%" }}>
          {error ? error : " Recruiter Details Added Successfully!"}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
export default AddRecruiter;
