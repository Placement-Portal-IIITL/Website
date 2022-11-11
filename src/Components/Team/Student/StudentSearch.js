import { useState } from "react";

// router
import { useNavigate } from "react-router-dom";

// MUI COmponents
import { Stack, TextField, InputAdornment, Button } from "@mui/material";

// MUI Icons
import SearchIcon from "@mui/icons-material/Search";
const StudentSearch = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <Stack spacing={1} direction="row" sx={{ width: "100%" }}>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="text.secondary" fontSize="small" />
            </InputAdornment>
          ),
        }}
        fullWidth
        size="small"
        label="Search"
        placeholder="Student Name..."
        value={search}
        onChange={(e) => {
          if (e.target.value === "") navigate(`/team/student/list`);
          setSearch(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            navigate(`/team/student/list/${"search=" + search}`);
          }
        }}
      />
      <Button
        size="small"
        sx={{ textTransform: "none" }}
        onClick={(e) => {
          navigate(`/team/student/list/${"search=" + search}`);
        }}
        variant="outlined"
      >
        Search
      </Button>
    </Stack>
  );
};
export default StudentSearch;
