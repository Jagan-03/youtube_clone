import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getVideosByChannel } from "../../actions/videos";
import { getChannelDetails } from "../../actions/channel";
import VideoCard from "../VideosSection/VideoCard/VideoCard";

import "./channel.css";
import { Button } from "@mui/material";
import numeral from "numeral";

const Channel = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  React.useEffect(() => {
    dispatch(getVideosByChannel(id));
    dispatch(getChannelDetails(id));
  }, [dispatch, id]);

  const { loading, videos } = useSelector((state) => state.channelVideos);
  const { channel } = useSelector((state) => state.channelDetails);

  return (
    <div className="channel">
      <div className="channelHeader">
        <div className="channelHeader_imageCont">
          <img className="channelHeader_image" src={channel?.snippet?.thumbnails?.high?.url} alt={channel?.snippet?.title} />
        </div>
        <div className="channelHeader_details">
        <div>
          <h3>{channel?.snippet?.title}</h3>
          <p>{numeral(channel?.statistics?.subscriberCount).format("0.a")} subscribers</p>
        </div>
          <Button variant="contained" color={channel?.subscriptionStatus ? "grey" : "error"}>{ channel?.subscriptionStatus ? "Subscribed" : "Subscribe"}</Button>
        </div>
      </div>

      <div className="channel_videos">

      {!loading &&
        videos?.map((video) => (
          <VideoCard
            key={video.snippet.resourceId.videoId}
            id={video.snippet.resourceId.videoId}
            title={video.snippet.title}
            publishedAt={video.snippet.publishedAt}
            channelID={video.snippet.channelId}
            image={video.snippet.thumbnails.medium.url}
          />
        ))}
      </div>
    </div>
  );
};

export default Channel;
