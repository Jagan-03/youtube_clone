import { CircularProgress } from "@mui/material";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { getSubscribedChannels } from "../../actions/videos";
import ChannelRow from "../Search/ChannelRow/ChannelRow";

import "./subscriptions.css";

const Subscriptions = () => {
  const dispatch = useDispatch();

  const [hasMore, setHasMore] = React.useState(true);

  React.useEffect(() => {
    dispatch(getSubscribedChannels());
  }, [dispatch]);

  const { loading, channels, nextPageToken } = useSelector(
    (state) => state.subscribedChannels
  );

  React.useEffect(() => {
    if (nextPageToken === undefined) setHasMore(false);
    console.log(nextPageToken);
    console.log(hasMore);
  }, [nextPageToken, hasMore]);

  const fetchData = () => {
    dispatch(getSubscribedChannels());
  };

  return (
    <div className="subscriptions">
      <InfiniteScroll
        dataLength={channels.length}
        next={() => fetchData()}
        hasMore={hasMore}
        loader={<CircularProgress />}
        className="videoSection_scroller"
      >
        {channels.map((channel) => (
          <ChannelRow
            key={channel.snippet.resourceId.channelId}
            id={channel.snippet.resourceId.channelId}
            image={channel.snippet.thumbnails.medium.url}
            channel={channel.snippet.title}
            noOfVideos={channel.contentDetails.totalItemCount}
            description={channel.snippet.description}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Subscriptions;
