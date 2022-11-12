import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/userContext";

import { useNavigate } from "react-router-dom";
// MUI Components
import { Stack, Alert } from "@mui/material";
// Components
import Feed from "./Feed/Feed";
const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  useEffect(() => {
    if (!user) navigate("/Login");
  }, [user]);

  return (
    <Stack>
      {user ? <Feed /> : <Alert severity="error"> Unauthorized access. Please Login!</Alert>}
    </Stack>
  );
};

export default Home;
