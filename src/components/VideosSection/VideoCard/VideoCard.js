import React from "react";
import { useHistory } from "react-router-dom";
import "./videocard.css";

import Avatar from "@mui/material/Avatar";
import request from "../../../api";

import moment from "moment";
import numeral from "numeral";

const VideoCard = ({
  id,
  image,
  title,
  publishedAt,
  channel,
  channelImage,
  channelID,
}) => {
  const [views, setViews] = React.useState(null);
  const [duration, setDuration] = React.useState(null);
  const [channelIcon, setChannelIcon] = React.useState(null);
  const [channelName, setChannelName] = React.useState(null);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const history = useHistory();

  React.useEffect(() => {
    const getVideoDetails = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id,
        },
      });
      setViews(items[0].statistics.viewCount);
      setDuration(items[0].contentDetails.duration);
    };
    getVideoDetails();
  }, [id]);

  React.useEffect(() => {
    const getChannelDetails = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelID,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.high.url);
      setChannelName(items[0].snippet.title);
    };
    getChannelDetails();
  }, [channelID]);

  const openWatchScreen = () => {
    history.push(`/watch/${id}`);
  }

  return (
    <div className="videoCard" onClick={openWatchScreen}>
      <div className="videoCard_top">
        <img className="videoCard_thumbnail" src={image} alt="video_thumbnai" />
        <span className="videoCard_duration">{_duration}</span>
      </div>
      <div className="videoCard_info">
        <Avatar
          className="videoCard_avatar"
          alt={channelName}
          src={channelIcon}
        />
        <div className="videoCard_text">
          <h4>{`${title.substring(0, 35)}...`}</h4>
          <p>{channelName}</p>
          <p>
            {numeral(views).format("0.a")} views ⋅{" "}
            {moment(publishedAt).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
