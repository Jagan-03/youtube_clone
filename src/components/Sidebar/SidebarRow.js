import React from 'react'

import "./sidebar.css";

const SidebarRow = ({selected ,Icon, title}) => {
    return (
        <div className={`sidebarRow ${selected && "selected"}`}>
            <Icon className="sidebar_icon" />
            <h3 className="sidebar_title">{title}</h3>
        </div>
    )
}

export default SidebarRow;
