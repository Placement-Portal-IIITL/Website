import { useState } from "react";
// MUI Components
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { Stack, Typography } from "@mui/material";

const CompanyFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const Filter = ({ id, value, defaultValue, label, name, items }) => {
    return (
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small" fullWidth>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Select
          defaultValue={defaultValue}
          id={id}
          label={label}
          name={name}
          onChange={handleChange}
          value={value}
        >
          {items.map((item) => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
          ;
        </Select>
      </FormControl>
    );
  };

  return (
    <Stack
      sx={{
        width: "100%",
        border: "1px solid rgba(0,0,0,0.2)",
        borderRadius: "5px",
        paddingRight: "8px",
      }}
    >
      <Typography variant="caption" color="text.secondary" sx={{ margin: "8px 0px 0px 8px" }}>
        <strong>Apply Filters</strong>
      </Typography>
      <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
        <Filter
          id="entriesPerPage"
          defaultValue={10}
          value={filters.entriesPerPage ? filters.entriesPerPage : 10}
          label="Companies Per Page"
          name="entriesPerPage"
          items={[
            { value: 5, label: "5" },
            { value: 10, label: "10" },
            { value: 25, label: "25" },
            { value: 50, label: "50" },
          ]}
        />
        <Filter
          id="minCTC"
          defaultValue={10}
          value={filters.minCTC ? filters.minCTC : 10}
          label="Min CTC (LPA)"
          name="minCTC"
          items={[
            { value: 5, label: "5 LPA" },
            { value: 10, label: "10 LPA" },
            { value: 12, label: "12 LPA" },
            { value: 14, label: "14 LPA" },
            { value: 16, label: "16 LPA" },
            { value: 18, label: "18 LPA" },
            { value: 20, label: "20 LPA" },
            { value: 25, label: "25 LPA" },
            { value: 30, label: "30 LPA" },
            { value: 40, label: "40 LPA" },
            { value: 50, label: "50 LPA" },
            { value: 60, label: "60+ LPA" },
          ]}
        />
        <Filter
          id="maxCTC"
          defaultValue={10}
          value={filters.maxCTC ? filters.maxCTC : 10}
          label="Max CTC (LPA)"
          name="maxCTC"
          items={[
            { value: 5, label: "5 LPA" },
            { value: 10, label: "10 LPA" },
            { value: 12, label: "12 LPA" },
            { value: 14, label: "14 LPA" },
            { value: 16, label: "16 LPA" },
            { value: 18, label: "18 LPA" },
            { value: 20, label: "20 LPA" },
            { value: 25, label: "25 LPA" },
            { value: 30, label: "30 LPA" },
            { value: 40, label: "40 LPA" },
            { value: 50, label: "50 LPA" },
            { value: 60, label: "60+ LPA" },
          ]}
        />
        <Filter
          id="minBase"
          defaultValue={10}
          value={filters.minBase ? filters.minBase : 10}
          label="Min Base (LPA)"
          name="minBase"
          items={[
            { value: 5, label: "5 LPA" },
            { value: 10, label: "10 LPA" },
            { value: 12, label: "12 LPA" },
            { value: 14, label: "14 LPA" },
            { value: 16, label: "16 LPA" },
            { value: 18, label: "18 LPA" },
            { value: 20, label: "20 LPA" },
            { value: 25, label: "25 LPA" },
            { value: 30, label: "30 LPA" },
          ]}
        />
        <Filter
          id="maxBase"
          defaultValue={10}
          value={filters.maxBase ? filters.maxBase : 10}
          label="Max Base (LPA)"
          name="maxBase"
          items={[
            { value: 5, label: "5 LPA" },
            { value: 10, label: "10 LPA" },
            { value: 12, label: "12 LPA" },
            { value: 14, label: "14 LPA" },
            { value: 16, label: "16 LPA" },
            { value: 18, label: "18 LPA" },
            { value: 20, label: "20 LPA" },
            { value: 25, label: "25 LPA" },
            { value: 30, label: "30 LPA" },
          ]}
        />
        <Filter
          id="minStipend"
          defaultValue={30000}
          value={filters.minStipend ? filters.minStipend : 30000}
          label="Min Stipend (per month)"
          name="minStipend"
          items={[
            { value: 25000, label: "25,000" },
            { value: 30000, label: "30,000" },
            { value: 35000, label: "35,000" },
            { value: 40000, label: "40,000" },
            { value: 50000, label: "50,000" },
            { value: 60000, label: "60,000" },
            { value: 80000, label: "80,000" },
            { value: 100000, label: "1,00,000" },
            { value: 150000, label: "1,50,000" },
          ]}
        />
        <Filter
          id="maxStipend"
          defaultValue={30000}
          value={filters.minStipend ? filters.minStipend : 30000}
          label="Max Stipend (per month)"
          name="maxStipend"
          items={[
            { value: 25000, label: "25,000" },
            { value: 30000, label: "30,000" },
            { value: 35000, label: "35,000" },
            { value: 40000, label: "40,000" },
            { value: 50000, label: "50,000" },
            { value: 60000, label: "60,000" },
            { value: 80000, label: "80,000" },
            { value: 100000, label: "1,00,000" },
            { value: 150000, label: "1,50,000" },
          ]}
        />
      </Stack>
    </Stack>
  );
};
export default CompanyFilters;
