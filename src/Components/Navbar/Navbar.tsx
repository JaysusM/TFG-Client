import React, { useState, ChangeEvent, FunctionComponent } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Popper,
  Button,
  TextField,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { NavBarProps } from "./Types";
import SyncLoader from "react-spinners/SyncLoader";
import {DateFilter} from "../App/Types";
import "./Navbar.scss";
import { getMeasurements } from "../../Utils/api";
import { AxiosResponse } from "axios";

export const Navbar: FunctionComponent<NavBarProps> = ({ setDate }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isDownloading, setIsDownloading] = React.useState<boolean>(false);
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
      to
    });
  };

  const handleDownloadClick = () => {
    const filterDate: DateFilter = {
      from,
      to,
    };

    setIsDownloading(true);

    getMeasurements(filterDate).then((response: AxiosResponse) => {
      setIsDownloading(false);
      const fileData = JSON.stringify(response.data);
      const blob = new Blob([fileData], {type: "application/json"});
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `measurements${from ? "_" + from : ""}${to ? "_" + to : ""}.json`;
      link.href = url;
      link.click();
    });
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" className="navbar-title">
          Sound Viewer
        </Typography>
        <Button
          className="navbar-menu-button"
          variant="outlined"
          color="secondary"
          onClick={handleClick}
        >
          <MenuIcon color="secondary" />
        </Button>
        <Popper open={open} anchorEl={anchorEl} transition>
          <div className="filter-popper">
            <TextField
              type="date"
              label="From"
              className="popper-datepicker"
              color="secondary"
              onChange={handleFromDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              type="date"
              label="To"
              className="popper-datepicker"
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
            {!isDownloading ? (
              <Button
                variant="contained"
                color="primary"
                className="filter-button"
                disableElevation
                onClick={handleDownloadClick}
              >
                Download Data
              </Button>
            ) : (
              <div className="download-loader">
                <SyncLoader color="#000000" size={8} />
              </div>
            )}
          </div>
        </Popper>
      </Toolbar>
    </AppBar>
  );
};
