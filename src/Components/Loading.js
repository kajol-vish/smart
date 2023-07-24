import "./Loading.scss";
import loading_img from "../Assets/1473.gif";
import { Typography } from "@mui/material";
const Loading = () => {
  return (
    <div className="loading-container">
      <img src={loading_img} alt="Weather Icon" width="100px" height="100px" />
      <Typography variant="h4" sx={{ color: "navy", fontWeight: 800 }}>
        Please wait...
      </Typography>
    </div>
  );
};
export default Loading;
