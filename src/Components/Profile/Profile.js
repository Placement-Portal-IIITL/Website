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
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    getStudentProfile();
  }, [params.subprofile]);

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
              <ProfileNav studentProfile={studentProfile} />
              {params.subprofile === "manage" ? (
                <ManageProfile studentProfile={studentProfile} />
              ) : params.subprofile === "resume" ? (
                <Resume />
              ) : params.subprofile === "documents" ? (
                <Documents />
              ) : (
                <ManageProfile studentProfile={studentProfile} />
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
