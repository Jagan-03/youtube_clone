import React from "react";
import { Avatar } from "@mui/material";
import "./channelRow.css";
import { useHistory } from "react-router";

const ChannelRow = ({
  id,
  image,
  channel,
  description,
  noOfVideos
}) => {

  const history = useHistory();

  const openChannel = () => {
    history.push(`/channel/${id}`)
  }

  return (
    <div className="channelRow" onClick={openChannel}>
      <Avatar className="channelRow_logo" alt={channel} src={image} />
      <div className="channelRow_text">
        <h4>{channel}</h4>
        {noOfVideos ? <p className="channelRow_desc">{noOfVideos} videos</p> : <></>}
        <p className="channelRow_desc">{`${description.substring(0, 200)}...`}</p>
      </div>
    </div>
  );
};

export default ChannelRow;
