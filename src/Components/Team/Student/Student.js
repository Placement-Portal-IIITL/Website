// Hooks
import { useState, useEffect } from "react";

// React Router
import { useParams, useNavigate } from "react-router-dom";

// MUI Components
import { Box, Tabs, Tab } from "@mui/material";

// MUI Icons
import ListIcon from "@mui/icons-material/List";
import DetailsIcon from "@mui/icons-material/ManageAccounts";
// import UpdateIcon from "@mui/icons-material/Upgrade";

// Profile Components
import StudentList from "./StudentList";
import StudentDetails from "./StudentDetails";
// import AddRecruiter from "./AddRecruiter";

const style = { minHeight: 0, fontFamily: "Nunito", textTransform: "none", fontSize: "12px" };

const getValue = (subPanel) => {
  switch (subPanel) {
    case "list":
      return 0;
    case "details":
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
      return "details";
    case 2:
      return "update";
    default:
      return 0;
  }
};

const Student = () => {
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
        <Tabs value={value} onChange={handleChange}>
          <Tab icon={<ListIcon />} iconPosition="start" label="Student List" sx={style} />
          <Tab icon={<DetailsIcon />} iconPosition="start" label="Student Details" sx={style} />
          {/* <Tab icon={<UpdateIcon />} iconPosition="start" label="Update Recruiter" sx={style} /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} element={<StudentList />} />
      <TabPanel value={value} index={1} element={<StudentDetails />} />
      {/* <TabPanel value={value} index={2} element={<UpdateRecruiter />} /> */}
    </Box>
  );
};

export default Student;
