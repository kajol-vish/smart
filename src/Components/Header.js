import "./Header.scss";
import { Typography } from "@mui/material";
import cloud from "../Assets/clouds-and-sun.png";
const Header = () => {
  return (
    <div className="header-container">
      <span>
        <img src={cloud} alt="Weather Icon" width="50px" height="50px" />
      </span>
      <Typography variant="h4" sx={{ color: "white" }}>
        Smart Weather
      </Typography>
    </div>
  );
};
export default Header;
