// MUI Components
import { TextField, Typography, MenuItem, CircularProgress } from "@mui/material";
import { InputAdornment, CirularProgress } from "@mui/material";

const onlyNumbers = /^\d+$/;
const RegisterTextField = (props) => {
  const {
    name,
    value,
    isNecessary,
    error,
    errorMsg,
    helpTxt,
    label,
    formData,
    setFormData,
    type,
    selectItems,
    loading,
  } = props;

  // handle field changes
  const handleChange = (e) => {
    if (type === "number/text") {
      if (onlyNumbers.test(e.target.value)) {
        setFormData((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
      }
    } else {
      setFormData((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };

  const ColoredAestrik = ({ label }) => {
    return (
      <>
        {label + " "}
        <Typography component="span" color="error">
          *
        </Typography>
      </>
    );
  };
  return (
    <>
      {type === "select" ? (
        <TextField
          variant="standard"
          select
          size="small"
          name={name}
          sx={{ minWidth: 300, "& label": { fontFamily: "Nunito" } }}
          onChange={handleChange}
          value={value}
          label={isNecessary ? <ColoredAestrik label={label} /> : label}
          error={error}
          helperText={error ? errorMsg : helpTxt}
          color={value ? "success" : "primary"}
          focused={!!value}
          disabled={loading}
          InputProps={
            loading
              ? {
                  startAdornment: (
                    <InputAdornment position="start">
                      {loading ? <CircularProgress size={12} color="inherit" /> : null}
                    </InputAdornment>
                  ),
                }
              : null
          }
        >
          <MenuItem key="" value="">
            Select
          </MenuItem>
          {selectItems &&
            selectItems.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
      ) : (
        <TextField
          variant="standard"
          type="text"
          size="small"
          name={name}
          onChange={handleChange}
          value={value}
          label={isNecessary ? <ColoredAestrik label={label} /> : label}
          error={error}
          helperText={error ? errorMsg : helpTxt}
          sx={{
            minWidth: 300,
            maxWidth: 300,
            "& label": { fontFamily: "Nunito" },
            "& p": { fontFamily: "Nunito", fontWeight: 600 },
          }}
          focused={!!value}
          color={value ? "success" : "primary"}
        />
      )}
    </>
  );
};
export default RegisterTextField;
