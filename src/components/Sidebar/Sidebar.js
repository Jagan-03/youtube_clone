import React from 'react'

import "./sidebar.css";
import SidebarRow from './SidebarRow';

import HomeIcon from '@mui/icons-material/Home';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ sidebar }) => {

    const { pathname } = useLocation();

    return (
        <div className={`sidebar ${sidebar ? "sidebar_open" : ""}`}>
        <div className={`sidebar_inner ${sidebar ? "sidebar_inner_open" : ""}`}>
            <Link to="/" className="text-dark">
                <SidebarRow selected={pathname === "/" ? true : false} Icon={HomeIcon} title="Home"/>
            </Link>
            {/* <SidebarRow Icon={WhatshotIcon} title="Trending"/> */}
            <Link to="/feed/subscriptions" className="text-dark">
                <SidebarRow selected={pathname === "/feed/subscriptions" ? true : false} Icon={SubscriptionsIcon} title="Subscription"/>
            </Link>
            <hr />
            <Link to="/feed/library" className="text-dark">
                <SidebarRow selected={pathname === "/feed/library" ? true : false} Icon={VideoLibraryIcon} title="Library"/>
            </Link>
            <Link to="/feed/history" className="text-dark">
                <SidebarRow selected={pathname === "/feed/history" ? true : false} Icon={HistoryIcon} title="History"/>
            </Link>
            {/* <SidebarRow Icon={OndemandVideoIcon} title="Your Videos"/> */}
            {/* <SidebarRow Icon={WatchLaterIcon} title="Watch Later"/> */}
            <Link to="/feed/likedVideos" className="text-dark">
                <SidebarRow selected={pathname === "/feed/likedVideos" ? true : false} Icon={ThumbUpAltOutlinedIcon} title="Liked Videos"/>
            </Link>
            <hr />
        </div>
        </div>
    )
}

export default Sidebar;
