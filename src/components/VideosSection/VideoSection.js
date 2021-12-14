import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularVideos } from "../../actions/videos";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from '@mui/material/CircularProgress';

import VideoCard from "./VideoCard/VideoCard";

import "./videosection.css";

// Component

const VideoSection = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  const { videos } = useSelector((state) => state.homeVideos);

  const fetchData = () => {
    dispatch(getPopularVideos());
  }

  return (
    <div className="videoSection">
      <h2>Recommended</h2>
        <InfiniteScroll
            dataLength={videos.length}
            next={() => fetchData()}
            hasMore={true}
            loader={
              <CircularProgress /> 
            }
            className="videoSection_scroller"
        >
      <div className="videoSection_videos">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              id={video.id}
              title={video.snippet.localized.title}
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

export default VideoSection;
