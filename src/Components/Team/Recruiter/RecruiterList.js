import { useState, useEffect } from "react";

// react router
import { useParams, useNavigate } from "react-router-dom";

// api
import axios from "../../../axios";

// MUI Components
import { Box, Stack, Typography, Avatar, Tooltip } from "@mui/material";
import { Pagination, IconButton, CircularProgress } from "@mui/material";
import { TextField, InputAdornment, Button } from "@mui/material";

// MUI-X Components
import { DataGrid } from "@mui/x-data-grid";

// MUI Icons
import UpdateIcon from "@mui/icons-material/Replay";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";

// assets
import CopyableText from "../../assets/MicroComponents/copyText";

// Components
import DeleteRecruiter from "./DeleteRecruiter";
import RecruiterDetails from "./RecruiterDetails";

const RecruiterList = () => {
  const params = useParams();
  const navigate = useNavigate();

  // states
  const [search, setSearch] = useState(
    params.value?.split("=")[0] === "search" ? params.value?.split("=")[1] : ""
  );
  const [companyId, setCompanyId] = useState(
    params.value?.split("=")[0] === "companyId" ? params.value?.split("=")[1] : ""
  );
  const [Loading, setLoading] = useState(false);
  const [recruiterList, setRecruiterList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [open, setOpen] = useState(false);
  const [recruiter, setRecruiter] = useState({});
  const [opencontact, setOpenContact] = useState(false);
  const [listChanged, setListChanged] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    entriesPerPage: 10,
  });

  const getRecruiterList = (filters) => {
    setLoading(true);
    // if (params.value) filters = { ...filters, : params.value };
    if (params.value?.split("=")[0] === "search")
      filters = { ...filters, searchQuery: params.value?.split("=")[1] };
    else if (params.value?.split("=")[0] === "companyId")
      filters = { ...filters, companyId: params.value?.split("=")[1] };

    axios
      .get("/getRecruiterList", { params: filters })
      .then((res) => {
        setRecruiterList(res.data.data);
        setTotalPages(res.data.pageCount);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getRecruiterList(filters);
  }, [filters, listChanged]);

  const handleDeleteCompany = (recruiter) => {
    setRecruiter(recruiter);
    setOpen(true);
  };

  const ColTxt = ({ txt }) => {
    return (
      <Typography
        sx={{ fontSize: "11px", fontFamily: "Nunito", lineHeight: "none" }}
        align="justify"
      >
        <strong>{txt}</strong>
      </Typography>
    );
  };

  const columns = [
    {
      field: "recruiter",
      headerName: "Recruiter",
      width: 250,
      sortable: false,
      renderCell: (val) => {
        const res = val.value[0];
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar src={res.photo} alt={res.name} sx={{ height: 60, width: 60 }} />
            <Stack>
              <ColTxt txt={res.name} />
              <CopyableText text={res.id} fontSize="10px" />
            </Stack>
          </Stack>
        );
      },
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
      sortable: false,
      renderCell: (val) => {
        const res = val.value;
        return (
          <Stack sx={{ whiteSpace: "normal", width: "100%" }} spacing={1}>
            <ColTxt txt={res} />
          </Stack>
        );
      },
    },
    {
      field: "designation",
      headerName: "Designation",
      width: 200,
      sortable: false,
      renderCell: (val) => {
        const res = val.value || "";
        return (
          <Stack sx={{ whiteSpace: "normal", width: "100%" }} spacing={1}>
            <ColTxt txt={res} />
          </Stack>
        );
      },
    },
    {
      field: "linkedIn",
      headerName: "LinkedIn",
      width: 100,
      sortable: false,
      renderCell: (val) => {
        const res = val.value || "";
        return (
          <IconButton
            color="primary"
            size="small"
            onClick={() => {
              window.open(res, "_blank");
            }}
          >
            <LinkedInIcon />
          </IconButton>
        );
      },
    },
    {
      field: "contact",
      headerName: "Contact",
      sortable: false,
      width: 100,
      renderCell: (val) => {
        const res = val.value;
        return (
          <Tooltip title="View Contact Details" arrow>
            <IconButton
              onClick={() => {
                setOpenContact(true);
                setRecruiter(res);
              }}
            >
              <MoreIcon />
            </IconButton>
          </Tooltip>
        );
      },
    },
    {
      field: "remarks",
      headerName: "Remarks",
      sortable: false,
      width: 200,
      renderCell: (val) => {
        const res = val.value;
        return (
          <Stack sx={{ whiteSpace: "normal", width: "100%" }} spacing={1}>
            <ColTxt txt={res} />
          </Stack>
        );
      },
    },
    {
      field: "update",
      headerName: "Update",
      sortable: false,
      width: 80,
      renderCell: (val) => {
        const res = val.value;
        return (
          <Tooltip title="Update Details" arrow>
            <IconButton onClick={() => navigate(`/team/recruitment/update/${res}`)} size="small">
              <EditIcon color="text.secondary" fontSize="small" />
            </IconButton>
          </Tooltip>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 80,
      renderCell: (val) => {
        const res = val.value;
        return (
          <Tooltip title="Delete Permanently" arrow>
            <IconButton onClick={() => handleDeleteCompany(res)} size="small">
              <DeleteIcon color="error" fontSize="small" />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];

  const rows = recruiterList.map((recruiter) => {
    return {
      id: recruiter._id,
      recruiter: [
        {
          name: recruiter.firstName + " " + recruiter.lastName,
          id: recruiter._id,
          photo: recruiter.photo,
        },
      ],
      gender: recruiter.gender,
      designation: recruiter.designation,
      linkedIn: recruiter.linkedIn,
      remarks: recruiter.remarks,
      contact: recruiter,
      update: recruiter._id,
      delete: recruiter,
    };
  });

  const handleChange = (e, newPage) => {
    setFilters({ ...filters, page: newPage });
  };

  return (
    <Stack spacing={1} justifyContent="center" alignItems="center" sx={{ padding: "10px" }}>
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
          placeholder="Recruiter Name..."
          value={search}
          onChange={(e) => {
            if (e.target.value === "") navigate(`/team/recruitment/list`);
            setSearch(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              navigate(`/team/recruitment/list/${"search=" + search}`);
            }
          }}
        />
        <Button
          size="small"
          sx={{ textTransform: "none" }}
          onClick={(e) => {
            navigate(`/team/recruitment/list/${"search=" + search}`);
          }}
        >
          Search
        </Button>
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
          label="Search by Company"
          placeholder="Company Id..."
          value={companyId}
          onChange={(e) => {
            if (e.target.value === "") navigate(`/team/recruitment/list`);
            setCompanyId(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              navigate(`/team/recruitment/list/${"companyId=" + companyId}`);
            }
          }}
        />
        <Button
          size="small"
          sx={{ textTransform: "none" }}
          onClick={(e) => {
            navigate(`/team/recruitment/list/${"companyId=" + companyId}`);
          }}
        >
          Search
        </Button>
      </Stack>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          loading={Loading}
          rows={rows}
          columns={columns}
          autoHeight
          rowHeight={100}
          pageSize={filters.entriesPerPage}
          hideFooter
          disableColumnMenu
          disableSelectionOnClick
          rowBuffer={10}
          density="compact"
          headerHeight={48}
        />
      </Box>
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton size="small">
          {Loading ? (
            <CircularProgress size={15} color="inherit" />
          ) : (
            <UpdateIcon sx={{ height: "15px", width: "15px" }} />
          )}
        </IconButton>
        <Pagination
          page={filters.page}
          onChange={handleChange}
          count={totalPages}
          shape="rounded"
          color="primary"
          variant="outlined"
        />
      </Stack>
      <DeleteRecruiter
        recruiter={recruiter}
        setOpen={setOpen}
        open={open}
        setListChanged={setListChanged}
      />
      <RecruiterDetails recruiter={recruiter} open={opencontact} setOpen={setOpenContact} />
    </Stack>
  );
};
export default RecruiterList;
