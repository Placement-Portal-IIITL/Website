import { useState, useEffect } from "react";

// react router
import { useParams, useNavigate, Navigate } from "react-router-dom";

// API
import axios from "../../../axios";

//  MUI Components
import { Stack, TextField, Avatar, Button, Divider } from "@mui/material";
import { CircularProgress, Snackbar, Alert, Typography } from "@mui/material";

const style = {
  minWidth: 300,
  maxWidth: 300,
  "& label": { fontFamily: "Nunito" },
  "& p": { fontFamily: "Nunito", fontWeight: 600 },
  "& input": { fontSize: "14px" },
};

const getCompanyId = (url) => {
  const tmp = url.split("/");
  const idx = tmp.findIndex((element) => element === "company");
  return tmp[idx + 1];
};

const UpdateCompany = () => {
  const params = useParams();
  const navigate = useNavigate();

  // states
  const [Loading, setLoading] = useState(false);
  const [scrapperLoad, setScrapperLoad] = useState(false);
  const [updateCompanyLoad, setUpdateCompanyLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState([]);
  const [scrapperError, setScrapperError] = useState("");
  const [formData, setFormData] = useState({
    companyId: "",
    name: "",
    linkedIn: "",
    natureOfBusiness: "",
    logo: "",
    website: "",
    expectedCTC: "",
    expectedBase: "",
    expectedStipend: "",
    location: "",
    remarks: "",
  });

  const getCompanyDetails = (companyId) => {
    if (companyId) {
      setLoading(true);
      setFormData({ ...formData, companyId: companyId });
      axios
        .get("/getCompanyDetails", {
          params: {
            companyId: companyId,
          },
        })
        .then((res) => {
          setFormData({ ...res.data, companyId: res.data._id });
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.data.errors) setErrors(err.response.data.errors);
        });
    }
  };
  useEffect(() => {
    getCompanyDetails(params.value);
  }, [params.value]);

  const runScrapper = () => {
    setScrapperError("");
    const companyId = getCompanyId(formData.linkedIn);
    if (companyId) {
      setScrapperLoad(true);
      axios
        .get("/scrapCompanyProfile", {
          params: {
            profileId: companyId,
          },
        })
        .then((res) => {
          setScrapperLoad(false);
          // console.log(res.data);
          setFormData({
            ...formData,
            name: res.data.name || formData.name,
            natureOfBusiness: res.data.natureOfBusiness || formData.natureOfBusiness,
            website: res.data.website || formData.website,
            linkedIn: res.data.linkedIn || formData.linkedIn,
            logo: res.data.logo || formData.logo,
          });
        })
        .catch((err) => {
          console.log(err.response.data);
          setScrapperError("Some error occured!");
          setScrapperLoad(false);
        });
    } else {
      setScrapperError("LinkedIn URL Invalid!");
    }
  };

  const handleUpdateCompany = () => {
    setUpdateCompanyLoad(true);
    axios
      .post("/updateCompany", formData)
      .then((res) => {
        setOpen(true);
        setUpdateCompanyLoad(false);
      })
      .catch((err) => {
        setUpdateCompanyLoad(false);
        if (err.response.data.errors) setErrors(err.response.data.errors);
        console.log(err.response.data);
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

  return (
    <Stack spacing={1} sx={{ width: "100%", padding: "10px 15px" }}>
      {Loading ? (
        <CircularProgress size={20} color="primary" />
      ) : (
        <>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              variant="standard"
              size="small"
              sx={style}
              name="companyId"
              onChange={handleChange}
              value={formData.companyId}
              label="CompanyId"
              helperText={
                error
                  ? error
                  : errors.find((e) => e.param === "companyId")?.error
                  ? errors.find((e) => e.param === "companyId")?.error
                  : "Get Company Details with Company Unique Id"
              }
              error={!!error.length || !!errors.find((e) => e.param === "companyId")}
            />
            <Button
              color="primary"
              variant="outlined"
              size="small"
              sx={{ textTransform: "none" }}
              onClick={() => navigate(`/team/company/update/${formData.companyId}`)}
            >
              Get Company Details
            </Button>
          </Stack>
          <Typography variant="h6" color="text.secondary">
            Company Logo
          </Typography>
          <Avatar src={formData.logo} alt="Company Logo" sx={{ height: 80, width: 80 }} />
          <Divider orientation="horizontal" flexItem />
          <Typography variant="h6" color="text.secondary">
            Company LinkedIn
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
              placeholder="https://www.linkedin.com/company/google/"
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
          <Divider orientation="horizontal" flexItem />
          <Typography variant="h6" color="text.secondary">
            Company Details
          </Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              variant="standard"
              size="small"
              sx={style}
              name="name"
              onChange={handleChange}
              value={formData.name}
              label="Company Name"
              placeholder="eg : Google"
              helperText={
                error
                  ? error
                  : errors.find((e) => e.param === "name")?.error
                  ? errors.find((e) => e.param === "name")?.error
                  : "Full Name of Company"
              }
              error={!!error.length || !!errors.find((e) => e.param === "name")}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              variant="standard"
              size="small"
              sx={style}
              name="natureOfBusiness"
              onChange={handleChange}
              value={formData.natureOfBusiness}
              label="Nature Of Business"
              helperText="Companies Nature of Business eg : (IT, Computer Software)"
            />
            <TextField
              variant="standard"
              size="small"
              sx={style}
              name="logo"
              onChange={handleChange}
              value={formData.logo}
              label="Company Logo"
              helperText="Company Logo URL"
            />
            <TextField
              variant="standard"
              size="small"
              sx={style}
              name="logo"
              onChange={handleChange}
              value={formData.website}
              label="Company Website"
              helperText="Company Website URL"
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              variant="standard"
              size="small"
              sx={style}
              name="expectedCTC"
              onChange={handleChange}
              value={formData.expectedCTC}
              label="CTC (expected)"
              placeholder="eg : 30"
              helperText="Expected CTC in LPA provided by Company"
            />
            <TextField
              variant="standard"
              size="small"
              sx={style}
              name="expectedBase"
              onChange={handleChange}
              value={formData.expectedBase}
              label="Base (expected)"
              placeholder="eg : 18"
              helperText="Expected Base in LPA provided by Company"
            />
            <TextField
              variant="standard"
              size="small"
              sx={style}
              name="expectedStipend"
              onChange={handleChange}
              value={formData.expectedStipend}
              label="Stipend (expected)"
              placeholder="eg : 80000"
              helperText="Expected Internship Stipend per Month in INR provided by Company"
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              variant="standard"
              size="small"
              sx={style}
              name="location"
              onChange={handleChange}
              value={formData.location}
              label="Location"
              placeholder="eg : India"
              helperText="Company Office Location"
            />
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
              helperText="Any Remarks Regarding Company"
            />
          </Stack>
          <Divider orientation="horizontal" flexItem />
          <Button
            variant="outlined"
            color="success"
            startIcon={updateCompanyLoad ? <CircularProgress size={15} color="inherit" /> : null}
            sx={{ width: 300, textTransform: "none" }}
            onClick={handleUpdateCompany}
            disabled={updateCompanyLoad}
          >
            Update Company
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
              Company Updated Successfully!
            </Alert>
          </Snackbar>
        </>
      )}
    </Stack>
  );
};
export default UpdateCompany;
