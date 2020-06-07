import React, { useState, ChangeEvent, FunctionComponent } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Popper,
  Button,
  TextField,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { NavBarProps } from "./Types";
import "./Navbar.scss";

export const Navbar: FunctionComponent<NavBarProps> = ({ setDate }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [from, setFrom] = useState<String>();
  const [to, setTo] = useState<String>();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open: boolean = Boolean(anchorEl);
  const handleFromDate = (event: ChangeEvent) => {
    // @ts-ignore
    setFrom(event.target.value);
  };

  const handleToDate = (event: ChangeEvent) => {
    // @ts-ignore
    setTo(event.target.value);
  };

  const handleFilterClick = () => {
    setDate({
      from,
      to,
    });
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" className="navbar-title">
          Sound Viewer
        </Typography>
        <Button
          className="filter-button"
          variant="outlined"
          color="secondary"
          onClick={handleClick}
        >
          <FilterListIcon color="secondary" />
        </Button>
        <Popper open={open} anchorEl={anchorEl} transition>
          <div className="filter-popper">
            <TextField
              type="date"
              label="From"
              className="navbar-datepicker"
              color="secondary"
              onChange={handleFromDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              type="date"
              label="To"
              className="navbar-datepicker"
              color="secondary"
              onChange={handleToDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              className="filter-button"
              disableElevation
              onClick={handleFilterClick}
            >
              Filter
            </Button>
          </div>
        </Popper>
      </Toolbar>
    </AppBar>
  );
};
