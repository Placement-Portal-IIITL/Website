// Hooks
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/userContext";

// React Router
import { useParams, useNavigate } from "react-router-dom";

// api
import axios from "../../axios";

// MUI Components
import { Stack, Divider, Alert, LinearProgress } from "@mui/material";

// Components
import TeamNav from "./TeamNavigation";
import Company from "./Company/Company";
import Recruiter from "./Recruiter/Recruiter";

const Team = () => {
  // user context
  const [user] = useContext(UserContext);
  const params = useParams();
  const navigate = useNavigate();

  // panel
  const [Loading, setLoading] = useState(false);
  const [studentProfile, setStudentProfile] = useState({});

  const getStudentProfile = () => {
    setLoading(true);
    const url = "/getStudentProfile";
    axios
      .get(url)
      .then((res) => {
        setStudentProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    getStudentProfile();
    if (params.panel === undefined) navigate(`/team/company`);
  }, []);

  return (
    <>
      {user ? (
        <>
          {Loading ? (
            <LinearProgress />
          ) : (
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              sx={{ minHeight: "calc(100vh - 64px)" }}
            >
              <TeamNav studentProfile={studentProfile} />
              {params.panel === "company" ? (
                <Company />
              ) : params.panel === "recruitment" ? (
                <Recruiter />
              ) : null}
            </Stack>
          )}
        </>
      ) : (
        <Alert severity="error">UnAuthorized Access. Please Login to Access Portal</Alert>
      )}
    </>
  );
};

export default Team;
