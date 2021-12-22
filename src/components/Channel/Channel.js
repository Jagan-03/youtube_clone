import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getVideosByChannel } from "../../actions/videos";
import { getChannelDetails, subscribeChannel, unsubscribeChannel } from "../../actions/channel";
import VideoCard from "../VideosSection/VideoCard/VideoCard";

import "./channel.css";
import { Button, CircularProgress } from "@mui/material";
import numeral from "numeral";
import InfiniteScroll from "react-infinite-scroll-component";

const Channel = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  React.useEffect(() => {
    dispatch(getVideosByChannel(id));
    dispatch(getChannelDetails(id));
  }, [dispatch, id]);
  
  const [hasMore, setHasMore] = React.useState(true);
  const { videos, nextPageToken } = useSelector((state) => state.channelVideos);
  const { channel } = useSelector((state) => state.channelDetails);
  const {subscriptionStatus, subscriptionId} = useSelector(
    (state) => state.channelDetails
  );

  React.useEffect(() => {
    if(nextPageToken === undefined) setHasMore(false);
    console.log(nextPageToken);
    console.log(hasMore);
  }, [nextPageToken, hasMore])

  const fetchData = () => {
    dispatch(getVideosByChannel(id));
  }

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
        {subscriptionStatus ? (
          <Button variant="contained" style={{backgroundColor : "grey"}} onClick={() => dispatch(unsubscribeChannel(subscriptionId))}>
            Subscribed
          </Button>
        ) : (
          <Button variant="contained" color="error" onClick={() => dispatch(subscribeChannel(id))}>
            Subscribe
          </Button>
        )}
        </div>
      </div>

      <InfiniteScroll
            dataLength={videos.length}
            next={() => fetchData()}
            hasMore={hasMore}
            loader={
              <CircularProgress /> 
            }
            className="videoSection_scroller"
        >
      <div className="channel_videos">

      {videos.map((video) => (
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
      </InfiniteScroll>
    </div>
  );
};

export default Channel;
