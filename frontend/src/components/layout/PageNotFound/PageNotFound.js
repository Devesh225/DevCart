import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import "./PageNotFound.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="PageNotFound">
      <ErrorIcon />
      <Typography>404, Page Not Found </Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default PageNotFound;