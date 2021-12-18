import React from 'react'

import "./sidebar.css";
import SidebarRow from './SidebarRow';

import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { Link } from 'react-router-dom';

const Sidebar = ({ sidebar }) => {
    return (
        <div className={`sidebar ${sidebar ? "sidebar_open" : ""}`}>
        <div className={`sidebar_inner ${sidebar ? "sidebar_inner_open" : ""}`}>
            <Link to="/">
                <SidebarRow selected Icon={HomeIcon} title="Home"/>
            </Link>
            {/* <SidebarRow Icon={WhatshotIcon} title="Trending"/> */}
            <Link to="/feed/subscriptions">
                <SidebarRow Icon={SubscriptionsIcon} title="Subscription"/>
            </Link>
            <hr />
            <SidebarRow Icon={VideoLibraryIcon} title="Library"/>
            <SidebarRow Icon={HistoryIcon} title="History"/>
            {/* <SidebarRow Icon={OndemandVideoIcon} title="Your Videos"/> */}
            {/* <SidebarRow Icon={WatchLaterIcon} title="Watch Later"/> */}
            <Link to="/feed/likedVideos">
                <SidebarRow Icon={ThumbUpAltOutlinedIcon} title="Liked Videos"/>
            </Link>
            <hr />
        </div>
        </div>
    )
}

export default Sidebar;
