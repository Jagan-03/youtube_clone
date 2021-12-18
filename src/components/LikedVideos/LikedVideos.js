import React from "react";
import { getLikedVideos } from "../../actions/videos";
import { useDispatch, useSelector } from "react-redux";

import "./likedVideos.css";
import VideoCard from "../VideosSection/VideoCard/VideoCard";
import { CircularProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

const LikedVideos = () => {
  const dispatch = useDispatch();

  const [hasMore, setHasMore] = React.useState(true);

  React.useEffect(() => {
    dispatch(getLikedVideos());
  }, [dispatch]);

    const { videos, nextPageToken } = useSelector(state => state.likedVideos);

  React.useEffect(() => {
    if(nextPageToken === undefined) setHasMore(false);
    console.log(nextPageToken);
    console.log(hasMore);
  }, [nextPageToken, hasMore])

    const fetchData = () => {
        dispatch(getLikedVideos());
      }

  return (
    <div className="likedVideos">
      <div className="likedVideos_header">
          <h4>Liked Videos</h4>
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

      <div className="likedVideos_videos">
        {videos.map((video) => (
            <VideoCard
              key={video.id}
              id={video.id}
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

export default LikedVideos;
