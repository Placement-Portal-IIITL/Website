// Hooks
import { useState, useEffect } from "react";

// React Router
import { useParams, useNavigate } from "react-router-dom";

// MUI Components
import { Box, Tabs, Tab } from "@mui/material";

// MUI Icons
import ListIcon from "@mui/icons-material/List";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Upgrade";

// Profile Components
import RecruiterList from "./RecruiterList";
// import AddCompany from "./AddCompany";
import UpdateRecruiter from "./UpdateRecruiter";

const style = { minHeight: 0, fontFamily: "Nunito", textTransform: "none", fontSize: "12px" };

const getValue = (subPanel) => {
  switch (subPanel) {
    case "list":
      return 0;
    case "add":
      return 1;
    case "update":
      return 2;
    default:
      return 0;
  }
};

const getsubPanel = (value) => {
  switch (value) {
    case 0:
      return "list";
    case 1:
      return "add";
    case 2:
      return "update";
    default:
      return 0;
  }
};

const Recruiter = () => {
  // subprofile panel
  const params = useParams();
  const navigate = useNavigate();

  const [value, setValue] = useState(getValue(params.subpanel));

  const handleChange = (event, newValue) => {
    navigate(`/team/${params.panel}/${getsubPanel(newValue)}`);
    setValue(newValue);
  };

  useEffect(() => {
    if (params.value)
      navigate(`/team/${params.panel}/${getsubPanel(getValue(params.subpanel))}/${params.value}`);
    else navigate(`/team/${params.panel}/${getsubPanel(getValue(params.subpanel))}`);
    setValue(getValue(params.subpanel));
  }, [params.subpanel]);

  const TabPanel = ({ value, index, element }) => {
    return value === index ? element : null;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab icon={<ListIcon />} iconPosition="start" label="Recruiter List" sx={style} />
          <Tab icon={<AddIcon />} iconPosition="start" label="Add Recruiter" sx={style} />
          <Tab icon={<UpdateIcon />} iconPosition="start" label="Update Recruiter" sx={style} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} element={<RecruiterList />} />
      {/* <TabPanel value={value} index={1} element={<AddCompany />} /> */}
      <TabPanel value={value} index={2} element={<UpdateRecruiter />} />
    </Box>
  );
};

export default Recruiter;
