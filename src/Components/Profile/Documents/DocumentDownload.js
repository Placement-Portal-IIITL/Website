// MUI Components
import { Button } from "@mui/material";

// MUI Icons
import DownloadIcon from "@mui/icons-material/Download";

// assets
import generateDownloadURL from "../../assets/Methods/GenerateGoogleDriveDownloadURL";

const ResumeDownload = ({ url }) => {
  // download resume
  const handleClick = () => {
    const downloadLink = generateDownloadURL(url);
    window.open(downloadLink, "_blank");
  };
  return (
    <div style={{ padding: "15px 24px 15px 0px" }}>
      <Button
        startIcon={<DownloadIcon />}
        variant="outlined"
        color="primary"
        size="small"
        onClick={handleClick}
        sx={{ textTransform: "none" }}
      >
        Download
      </Button>
    </div>
  );
};
export default ResumeDownload;
