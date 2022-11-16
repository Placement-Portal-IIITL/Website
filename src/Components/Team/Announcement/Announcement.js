// Hooks
import { useState, useEffect } from "react";
// API
import axios from "../../../axios";

// MUI Components
import { Divider, Stack, Typography } from "@mui/material";

// components
import SingleAnnouncement from "./SingleAnnouncement";
import AddAnouncement from "./AddAnouncement";

const Feed = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [updateFeed, setUpdateFeed] = useState(false);

  useEffect(() => {
    axios.get("/getAdminAnnouncements").then((res) => {
      setAnnouncements(res.data.data);
    });
  }, [updateFeed]);
  return (
    <Stack
      sx={{ width: "100%", minHeight: 600, padding: "20px 24px" }}
      spacing={2}
      alignItems="center"
    >
      <Typography
        textAlign="center"
        variant="h4"
        color="text.secondary"
        sx={{ fontFamily: "Nunito" }}
      >
        Announcements
      </Typography>
      <Divider flexItem orientation="horizontal" />
      <AddAnouncement setUpdateFeed={setUpdateFeed} />
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
        {announcements.map((announcement) => (
          <div key={announcement._id}>
            <SingleAnnouncement announcement={announcement} setUpdateFeed={setUpdateFeed} />
          </div>
        ))}
      </Stack>
    </Stack>
  );
};

export default Feed;
