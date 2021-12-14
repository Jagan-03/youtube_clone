import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscribedChannels } from "../../actions/videos";
import ChannelRow from "../Search/ChannelRow/ChannelRow";

import "./subscriptions.css";

const Subscriptions = () => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getSubscribedChannels());
    }, [dispatch]);

    const { loading, channels } = useSelector((state) => state.subscribedChannels);

  return <div className="subscriptions">

        {!loading && channels?.map(channel => <ChannelRow key={channel.snippet.resourceId.channelId} id={channel.snippet.resourceId.channelId} image={channel.snippet.thumbnails.medium.url} channel={channel.snippet.title} 
        noOfVideos={channel.contentDetails.totalItemCount} description={channel.snippet.description}/>)}

  </div>;
};

export default Subscriptions;
