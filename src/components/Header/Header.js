import React from "react";
import "./header.css";

import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../actions/auth";

const Header = ({handleSidebar}) => {
  const [inputSearch, setInputSearch] = React.useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSearch = () => {
    history.push(`/search/${inputSearch}`);
    setInputSearch("");
  }

  return (
    <div className="header">
      <div className="header_cont">
        <MenuIcon onClick={() => handleSidebar()}/>
        <Link to="/">
          <img
            className="header_logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/502px-Logo_of_YouTube_%282015-2017%29.svg.png"
            alt="youtube_logo"
          />
        </Link>
      </div>
      <div className="header_cont header_input">
        <input
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          type="text"
          placeholder="Search"
        />
        <Button onClick={handleSearch}>
          <SearchIcon className="header_search" />
        </Button>
      </div>
      <div className="header_cont">
        <VideoCallIcon className="header_icons" />
        <AppsIcon className="header_icons" />
        <NotificationsIcon className="header_icons" />
        <Avatar
          className="header_icons"
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
        />
        <Button variant="text" onClick={handleLogout}>
          <LogoutIcon className="header_icons header_icons_logout" />
        </Button>
      </div>
    </div>
  );
};

export default Header;
