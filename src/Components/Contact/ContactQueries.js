// Hooks
import { useState, useEffect } from "react";

// API
import axios from "../../axios";

// MUI Components
import { Stack, Typography, CircularProgress, Pagination } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Chip, Divider } from "@mui/material";

// MUI Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ResolvedIcon from "@mui/icons-material/TaskAlt";
import PendingIcon from "@mui/icons-material/Pending";

// Date Converter
const handleDate = (date) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const d = new Date(date);
  const newdate = d.getDate();
  const day = d.getDay();
  const month = d.getMonth();
  const year = d.getFullYear();
  const newDate = newdate + " " + monthNames[month] + ", " + year + " (" + dayNames[day] + ")";
  return newDate;
};

const ContactQueries = () => {
  const [Loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ page: 1, entriesPerPage: 10 });
  const [queriesList, setQueriesList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [expanded, setExpanded] = useState("");

  const getQueryList = () => {
    setLoading(true);
    axios
      .get("/getQueryList", {
        params: filters,
      })
      .then((res) => {
        setQueriesList(res.data.data);
        setTotalPages(res.data.pageCount);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getQueryList();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleOpenQuery = (name, isOpen) => {
    setExpanded(isOpen ? name : false);
  };

  return (
    <Stack sx={{ width: "100%", paddingRight: "24px" }} spacing={2}>
      <Stack spacing={1}>
        <FormControl sx={{ minWidth: 120, maxWidth: 200 }} fullWidth>
          <InputLabel htmlFor="QueriesPerPage">Queries Per Page</InputLabel>
          <Select
            id="QueriesPerPage"
            label="Queries Per Page"
            name="entriesPerPage"
            onChange={handleChange}
            value={filters.entriesPerPage}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        <Pagination
          page={filters.page}
          onChange={(e, newPage) => setFilters({ ...filters, page: newPage })}
          count={totalPages}
          shape="rounded"
          color="primary"
          variant="outlined"
        />
      </Stack>
      <Stack spacing={1}>
        {Loading ? (
          <CircularProgress size={20} />
        ) : (
          queriesList.map((query, idx) => {
            return (
              <Accordion
                key={query._id}
                expanded={expanded === `panel${idx}`}
                onChange={(e, isOpen) => handleOpenQuery(`panel${idx}`, isOpen)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${idx}bh-content`}
                  id={`panel${idx}bh-header`}
                >
                  <Typography
                    sx={{ color: "text.secondary", fontFamily: "Nunito" }}
                    variant="caption"
                  >
                    {query.message.length > 70
                      ? query.message.substr(0, 70) + "..."
                      : query.message}
                  </Typography>
                  {query.isResolved && (
                    <Stack sx={{ flexGrow: 1 }} alignItems="flex-end">
                      <Chip
                        label="Resolved"
                        icon={
                          <ResolvedIcon fontSize="small" sx={{ fontSize: "12px !important" }} />
                        }
                        size="small"
                        color="success"
                        sx={{ width: 100, fontSize: "12px" }}
                      />
                    </Stack>
                  )}
                  {!query.isResolved && (
                    <Stack sx={{ flexGrow: 1 }} alignItems="flex-end">
                      <Chip
                        label="Resolution Pending"
                        icon={<PendingIcon fontSize="small" sx={{ fontSize: "12px !important" }} />}
                        size="small"
                        color="warning"
                        sx={{ width: 150, fontSize: "12px" }}
                        variant="outlined"
                      />
                    </Stack>
                  )}
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ fontFamily: "Nunito" }} variant="body2">
                    {query.message}
                  </Typography>
                  <Divider />
                  {query.response && (
                    <Stack spacing={1} sx={{ mt: 2 }}>
                      <Typography sx={{ fontFamily: "Nunito" }} variant="h6">
                        Response
                      </Typography>
                      <Typography sx={{ fontFamily: "Nunito" }} variant="body2">
                        {query.response}
                      </Typography>
                    </Stack>
                  )}
                </AccordionDetails>
                <Divider />
                <Stack
                  sx={{ padding: "5px 15px" }}
                  direction="row"
                  spacing={1}
                  divider={<Divider flexItem orientation="vertical" />}
                >
                  <Typography sx={{ fontFamily: "Nunito" }} variant="caption">
                    {"Query Generated at : " + handleDate(query.createdAt)}
                  </Typography>
                  <Typography sx={{ fontFamily: "Nunito" }} variant="caption">
                    {"Email : " + query.email}
                  </Typography>
                  <Typography sx={{ fontFamily: "Nunito" }} variant="caption">
                    {"Student Name : " + query.name}
                  </Typography>
                  {query.phoneNo && (
                    <Typography sx={{ fontFamily: "Nunito" }} variant="caption">
                      {"Contact Number : " + query.phoneNo}
                    </Typography>
                  )}
                </Stack>
              </Accordion>
            );
          })
        )}
      </Stack>
    </Stack>
  );
};

export default ContactQueries;
