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
import { Divider, Icon, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import Logout from "@mui/icons-material/Logout";

const Header = ({handleSidebar}) => {
  const [inputSearch, setInputSearch] = React.useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [screenWidth, setScreenWidth] = React.useState(0);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSearch = () => {
    history.push(`/search/${inputSearch}`);
    setInputSearch("");
  }

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.screen.width);
    });
  }, [])

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const [appAnchorEl, setAppAnchorEl] = React.useState(null);
  const appOpen = Boolean(appAnchorEl);
  const handleAppClick = (event) => {
    setAppAnchorEl(event.currentTarget);
  };
  const handleAppClose = () => {
    setAppAnchorEl(null);
  };


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
      <IconButton onClick={handleAppClick} size="small" sx={{ ml: 2 }}>
        <AppsIcon className="header_icons" />
      </IconButton>
      <Menu
        anchorEl={appAnchorEl}
        open={appOpen}
        onClose={handleAppClose}
        onClick={handleAppClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <a className="header_appLink" href="https://tv.youtube.com/?utm_source=youtube_web&utm_medium=ep&utm_campaign=home&ve=34273" target="_blank">
          <img className="header_AppIcons" src="https://www.freepnglogos.com/uploads/youtube-tv-png/youtube-tv-youtube-watch-record-live-apk-download-from-moboplay-21.png" alt="youtube-tv" />
          Youtube TV
          </a>
        </MenuItem>
        <Divider />
        <MenuItem>
          <a className="header_appLink" href="https://music.youtube.com/" target="_blank">
          <img className="header_AppIcons" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Youtube_Music_icon.svg/1024px-Youtube_Music_icon.svg.png" alt="youtube-music" />
          Youtube Music
          </a>
        </MenuItem>
        <MenuItem>
          <a className="header_appLink" href="https://www.youtubekids.com/?source=youtube_web" target="_blank">
          <img className="header_AppIcons" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/YouTube_Kids_LogoVector.svg/1267px-YouTube_Kids_LogoVector.svg.png" alt="youtube-kids" />
          Youtube Kids
          </a>
        </MenuItem>
        <Divider />
        <MenuItem>
          <a className="header_appLink" href="https://artists.youtube.com/" target="_blank">
          <img className="header_AppIcons" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png" alt="youtube-artists" />
          Youtube for Artists
          </a>
        </MenuItem>
      </Menu>
        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
        <Avatar
          className="header_icons"
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
        />
        </IconButton>
        <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Divider />
        <MenuItem>
        <Button variant="text" onClick={handleLogout}>
          <LogoutIcon className="header_icons header_icons_logout" />
          Logout
        </Button>
        </MenuItem>
      </Menu>
      </div>
    </div>
  );
};

export default Header;
