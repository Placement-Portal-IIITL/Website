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
import SearchIcon from "@mui/icons-material/Search";

// Profile Components
import CompanyList from "./CompanyList";
import AddCompany from "./AddCompany";

const style = { minHeight: 0, fontFamily: "Nunito", textTransform: "none", fontSize: "12px" };

const getValue = (subPanel) => {
  switch (subPanel) {
    case "list":
      return 0;
    case "add":
      return 1;
    case "update":
      return 2;
    case "search":
      return 3;
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
    case 3:
      return "search";
    default:
      return 0;
  }
};

const Company = () => {
  // subprofile panel
  const params = useParams();
  const navigate = useNavigate();

  const [value, setValue] = useState(getValue(params.subpanel));

  const handleChange = (event, newValue) => {
    navigate(`/team/${params.panel}/${getsubPanel(newValue)}`);
    setValue(newValue);
  };

  useEffect(() => {
    navigate(`/team/${params.panel}/${getsubPanel(getValue(params.subpanel))}`);
  }, []);

  const TabPanel = ({ value, index, element }) => {
    return value === index ? element : null;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab icon={<ListIcon />} iconPosition="start" label="Company List" sx={style} />
          <Tab icon={<AddIcon />} iconPosition="start" label="Add Company" sx={style} />
          <Tab icon={<UpdateIcon />} iconPosition="start" label="Update Company" sx={style} />
          <Tab icon={<SearchIcon />} iconPosition="start" label="Search Company" sx={style} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} element={<CompanyList />} />
      <TabPanel value={value} index={1} element={<AddCompany />} />
      <TabPanel value={value} index={2} />
    </Box>
  );
};

export default Company;
