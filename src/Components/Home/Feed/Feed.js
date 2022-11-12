// Hooks
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../Context/userContext";
// API
import axios from "../../../axios";

// MUI Components
import { Stack, Typography } from "@mui/material";

// components
import Anouncement from "./Anouncement.js";
import AddAnouncement from "./AddAnouncement";
const Feed = () => {
  // user Context
  const [user, setUser] = useContext(UserContext);
  const [anouncements, setAnouncements] = useState([]);

  const [updateFeed, setUpdateFeed] = useState(false);

  useEffect(() => {
    axios.get("/getAnnouncements").then((res) => {
      setAnouncements(res.data.data);
    });
  }, [updateFeed]);
  return (
    <Stack
      sx={{ width: "100%", minHeight: 600, padding: "20px 24px", bgcolor: "rgba(0,0,0,0.05)" }}
      alignItems="center"
    >
      <Typography variant="h4" color="text.secondary">
        Announcements
      </Typography>
      <Stack
        sx={{
          width: "100%",
          flexGrow: 1,
          borderRadius: "15px",
          padding: "10px 0px",
        }}
        alignItems="center"
        spacing={2}
      >
        {user && user.roles.includes("PLACEMENT_TEAM") && <AddAnouncement />}
        {anouncements.map((e) => (
          <div key={e._id}>
            <Anouncement anouncement={e} setUpdateFeed={setUpdateFeed} />
          </div>
        ))}
      </Stack>
    </Stack>
  );
};

export default Feed;
