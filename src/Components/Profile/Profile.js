// react page title
import { Helmet } from "react-helmet-async";

// Hooks
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/userContext";

// React Router
import { useParams } from "react-router-dom";

// api
import axios from "../../axios";

// custom Css
import "./Profile.css";

// MUI Components
import { Stack, Divider, Alert, LinearProgress } from "@mui/material";

// Profile Components
import ProfileNav from "./ProfileNavigation";
import ManageProfile from "./ManageProfile/ManageProfile";
import Resume from "./Resume/Resume";
import Documents from "./Documents/Documents";

const Profile = () => {
  // user context
  const [user] = useContext(UserContext);

  // subprofile panel
  const params = useParams();

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
      });
  };

  useEffect(() => {
    getStudentProfile();
  }, []);

  return (
    <>
      <Helmet>
        <title>IIITL Placement Portal | Profile</title>
      </Helmet>
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
              <ProfileNav studentProfile={studentProfile} />
              {params.subprofile === "manage" ? (
                <ManageProfile
                  studentProfile={studentProfile}
                  setStudentProfile={setStudentProfile}
                />
              ) : params.subprofile === "resume" ? (
                <Resume studentProfile={studentProfile} setStudentProfile={setStudentProfile} />
              ) : params.subprofile === "documents" ? (
                <Documents studentProfile={studentProfile} setStudentProfile={setStudentProfile} />
              ) : (
                <ManageProfile
                  studentProfile={studentProfile}
                  setStudentProfile={setStudentProfile}
                />
              )}
            </Stack>
          )}
        </>
      ) : (
        <Alert severity="error">Please Login to Access Portal</Alert>
      )}
    </>
  );
};

export default Profile;
