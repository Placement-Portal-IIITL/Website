// Hooks
import { useState, useEffect } from "react";

// API
import axios from "../../../axios";

// MUI Components
import { Stack, Typography, CircularProgress, Pagination } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Chip, Divider, TextField, Button, IconButton } from "@mui/material";

// MUI Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ResolvedIcon from "@mui/icons-material/TaskAlt";
import PendingIcon from "@mui/icons-material/Pending";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [resolved, setResolved] = useState({ queryId: "", response: "" });
  const [resolveLoad, setResolveLoad] = useState(false);
  const [deleteLoad, setDeleteLoad] = useState(false);

  const getQueryList = () => {
    setLoading(true);
    axios
      .get("/getAdminQueryList", {
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

  const handleOpenQuery = (name, isOpen, response) => {
    setExpanded(isOpen ? name : false);
    setResolved({ ...resolved, response: response || "" });
  };

  const handleQueryResponse = (queryId) => {
    setResolveLoad(true);
    axios
      .post("/markQueryAsResolved", { ...resolved, queryId: queryId })
      .then((res) => {
        setQueriesList((prev) => {
          return prev.map((query) => {
            return query._id === queryId
              ? { ...query, isResolved: true, response: resolved.response }
              : query;
          });
        });
        setResolveLoad(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setResolveLoad(false);
      });
  };

  const handleDeleteQuery = (queryId) => {
    setDeleteLoad(true);
    axios
      .delete("/deleteQuery", { data: { queryId: queryId } })
      .then((res) => {
        setQueriesList((prev) => {
          return prev.filter((query) => query._id !== queryId);
        });
        setDeleteLoad(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setDeleteLoad(false);
      });
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
                onChange={(e, isOpen) => handleOpenQuery(`panel${idx}`, isOpen, query.response)}
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
                    <Stack sx={{ flexGrow: 1 }} alignItems="flex-end" spacing={1}>
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
                  <Stack sx={{ mt: 2 }} spacing={1}>
                    <TextField
                      size="small"
                      label="Response"
                      multiline
                      minRows={4}
                      helperText="Type Your Response"
                      value={resolved.response}
                      onChange={(e) => setResolved({ ...resolved, response: e.target.value })}
                    />
                    <Stack spacing={2} direction="row">
                      <Button
                        size="small"
                        sx={{ width: 100, textTransform: "none" }}
                        variant="outlined"
                        onClick={() => handleQueryResponse(query._id)}
                        endIcon={resolveLoad ? <CircularProgress size={12} /> : null}
                        disabled={resolveLoad}
                      >
                        Respond
                      </Button>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteQuery(query._id)}
                      >
                        {deleteLoad ? (
                          <CircularProgress size={12} />
                        ) : (
                          <DeleteIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Stack>
                  </Stack>
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
