// react hooks
import { useState, useEffect } from "react";

// react router
import { useParams, useNavigate } from "react-router-dom";

// MUI Components
import { Stack } from "@mui/material";
import { List, ListItem, ListItemButton } from "@mui/material";
import { ListItemIcon, ListItemText, Divider } from "@mui/material";

// MUI Icons
import EditIcon from "@mui/icons-material/Edit";
import ListIcon from "@mui/icons-material/ListAlt";

const ContactNav = () => {
  // hooks initalization
  const navigate = useNavigate();
  const params = useParams();
  const [panel, setPanel] = useState(params.panel || "addQuery");

  useEffect(() => {
    navigate(`/contact/${panel}`);
  }, [panel]);

  const handleClick = (newPanel) => {
    setPanel(newPanel);
  };
  return (
    <Stack sx={{ padding: "15px 24px", minWidth: 300 }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            name="addQuery"
            onClick={() => handleClick("addQuery")}
            selected={panel === "addQuery"}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Ask Query"
              sx={{ "& .MuiListItemText-primary": { fontFamily: "Nunito" } }}
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton
            name="queryList"
            onClick={() => handleClick("queryList")}
            selected={panel === "queryList"}
          >
            <ListItemIcon>
              <ListIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Previous Queries" />
          </ListItemButton>
        </ListItem>
      </List>
    </Stack>
  );
};

export default ContactNav;
