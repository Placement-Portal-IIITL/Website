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
    <div>
      <Button
        startIcon={<DownloadIcon />}
        variant="outlined"
        color="primary"
        size="small"
        sx={{ textTransform: "none" }}
        onClick={handleClick}
      >
        Download
      </Button>
    </div>
  );
};
export default ResumeDownload;
