// MUI Components
import { Button } from "@mui/material";

// MUI Icons
import DownloadIcon from "@mui/icons-material/Download";

// generate downloadable link
const generateDownloadLink = (url) => {
  const prefix = "https://drive.google.com/file/d/";
  const suffix = "&export=download";
  const documentId = url.replace(prefix, "").split("/")[0];
  return "https://drive.google.com/uc?id=" + documentId + suffix;
};

const ResumeDownload = ({ url }) => {
  // download resume
  const handleClick = () => {
    const downloadLink = generateDownloadLink(url);
    window.open(downloadLink, "_blank");
  };
  return (
    <div>
      <Button
        startIcon={<DownloadIcon />}
        variant="outlined"
        color="success"
        size="small"
        onClick={handleClick}
      >
        Download
      </Button>
    </div>
  );
};
export default ResumeDownload;
