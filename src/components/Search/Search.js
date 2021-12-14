import React from "react";

import "./search.css";

import ChannelRow from "./ChannelRow/ChannelRow";
import VideoRow from "./VideoRow/VideoRow";
import { useDispatch, useSelector } from "react-redux";
import { getVideoBySearch } from "../../actions/videos";
import { useParams } from "react-router-dom";

const Search = () => {
  const dispatch = useDispatch();
  const { query } = useParams();

  React.useEffect(() => {
    dispatch(getVideoBySearch(query));
  }, [dispatch, query]);

  const { videos, loading } = useSelector((state) => state.searchedVideos)

  return (
    <div className="searchPage">

      {!loading && videos?.map((video) => (
        video.id.kind === "youtube#channel" ?
        <ChannelRow
        key={video.id.channelId}
        id={video.id.channelId}
        image={video.snippet.thumbnails.medium.url}
        channel={video.snippet.channelTitle}
        noOfVideos={382}
        description={video.snippet.description}
        /> :
        <VideoRow
        key={video.id.videoId}
        id={video.id.videoId}
        description={video.snippet.description}
        timestamp={video.snippet.publishTime}
        channel={video.snippet.channelTitle}
        title={video.snippet.title}
        image={video.snippet.thumbnails.medium.url}
      />
      ))}
    </div>
  );
};

export default Search;
