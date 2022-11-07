import { useState, useEffect } from "react";

// api
import axios from "../../../axios";

// MUI Components
import { Box, Stack, Typography, Avatar } from "@mui/material";
import { Pagination, IconButton, CircularProgress } from "@mui/material";

// MUI-X Components
import { DataGrid } from "@mui/x-data-grid";

// MUI Icons
import UpdateIcon from "@mui/icons-material/Replay";
import RupeeIcon from "@mui/icons-material/CurrencyRupee";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WebsiteIcon from "@mui/icons-material/Language";

// assets
import CopyableText from "../../assets/copyText";

// Components
import CompanyFilters from "./CompanyFilters";

const CompanyList = () => {
  // states
  const [Loading, setLoading] = useState(false);
  const [companylist, setCompanylist] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] = useState({
    page: 1,
    entriesPerPage: 10,
  });

  const getCompanyList = (filters) => {
    setLoading(true);
    axios
      .get("/getCompanyList", { params: filters })
      .then((res) => {
        setCompanylist(res.data.data);
        setTotalPages(res.data.pageCount);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCompanyList(filters);
  }, [filters]);

  const ColTxt = ({ txt }) => {
    return (
      <Typography sx={{ fontSize: "11px", fontFamily: "Nunito", lineHeight: 0 }} align="justify">
        <strong>{txt}</strong>
      </Typography>
    );
  };

  const columns = [
    {
      field: "company",
      headerName: "Company Name",
      width: 250,
      renderCell: (val) => {
        const res = val.value[0];
        return (
          <Stack direction="row" spacing={1}>
            <Avatar src={res.logo} alt={res.name} />
            <Stack spacing={1}>
              <ColTxt txt={res.name} />
              <CopyableText text={res.id} fontSize="10px" />
            </Stack>
          </Stack>
        );
      },
    },
    {
      field: "location",
      headerName: "Location",
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
      field: "base",
      headerName: "Base (LPA)",
      width: 100,
      renderCell: (val) => {
        const res = val.value;
        return (
          <Stack sx={{ whiteSpace: "normal", width: "100%" }} spacing={1}>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
              sx={{ borderRadius: "5px", border: "1px solid rgba(0,0,0,0.2)", padding: "5px 10px" }}
            >
              <RupeeIcon sx={{ fontSize: "12px" }} />
              <ColTxt txt={res + " LPA"} />
            </Stack>
          </Stack>
        );
      },
    },
    {
      field: "ctc",
      headerName: "CTC (LPA)",
      width: 100,
      renderCell: (val) => {
        const res = val.value;
        return (
          <Stack sx={{ whiteSpace: "normal", width: "100%" }} spacing={1}>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
              sx={{ borderRadius: "5px", border: "1px solid rgba(0,0,0,0.2)", padding: "5px 10px" }}
            >
              <RupeeIcon sx={{ fontSize: "12px" }} />
              <ColTxt txt={res + " LPA"} />
            </Stack>
          </Stack>
        );
      },
    },
    {
      field: "stipend",
      headerName: "Stipend (per Month)",
      width: 150,
      renderCell: (val) => {
        const res = val.value;
        return (
          <Stack sx={{ whiteSpace: "normal", width: "100%" }} spacing={1}>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
              sx={{ borderRadius: "5px", border: "1px solid rgba(0,0,0,0.2)", padding: "5px 10px" }}
            >
              <RupeeIcon sx={{ fontSize: "12px" }} />
              <ColTxt txt={res} />
            </Stack>
          </Stack>
        );
      },
    },
    {
      field: "role",
      headerName: "Nature Of Business",
      width: 200,
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
      field: "contact",
      headerName: "Contact",
      width: 100,
      sortable: false,
      renderCell: (val) => {
        const res = val.value[0];
        return (
          <Stack sx={{ whiteSpace: "normal" }} spacing={1} direction="row">
            <IconButton
              size="small"
              color="primary"
              onClick={() => window.open(res.linkedin, "_blank")}
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="secondary"
              onClick={() => window.open(res.website, "_blank")}
            >
              <WebsiteIcon fontSize="small" />
            </IconButton>
          </Stack>
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
  ];

  const rows = companylist.map((company) => {
    return {
      id: company._id,
      company: [{ name: company.name, id: company._id, logo: company.logo }],
      location: company.location,
      base: company.expectedBase,
      ctc: company.expectedCTC,
      stipend: company.expectedStipend,
      role: company.natureOfBusiness,
      contact: [{ linkedin: company.linkedIn, website: company.website }],
      remarks: company.remarks,
    };
  });

  const handleChange = (e, newPage) => {
    setFilters({ ...filters, page: newPage });
  };

  const handleSort = (field, sort) => {
    switch (field) {
      case "company":
        handleSortChange("sortByName", sort);
        break;
      case "base":
        handleSortChange("sortByBase", sort);
        break;
      case "ctc":
        handleSortChange("sortByCTC", sort);
        break;
      case "stipend":
        handleSortChange("sortByStipend", sort);
        break;
    }
  };

  const handleSortChange = (name, value) => {
    delete filters.sortByName;
    delete filters.sortByCTC;
    delete filters.sortByBase;
    delete filters.sortByStipend;
    setFilters({ ...filters, [name]: value === "asc" ? 1 : -1 });
  };

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center" sx={{ padding: "15px 12px" }}>
      <CompanyFilters filters={filters} setFilters={setFilters} />
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
          onSortModelChange={(model) => {
            console.log(model);
            handleSort(model[0].field, model[0].sort);
          }}
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
    </Stack>
  );
};
export default CompanyList;
