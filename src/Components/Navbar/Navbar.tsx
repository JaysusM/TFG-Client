import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import "./Navbar.scss";

export const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" className="navbar-title">
          Malaga Sound Viewer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};