import React from "react";
import moment from "moment";
import numeral from "numeral";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ShowMoreText from "react-show-more-text";
import { useDispatch, useSelector } from "react-redux";
import { getChannelDetails, getSubcriptionStatus } from "../../actions/channel";
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

import "./videoMetaData.css";
import { rateVideo } from "../../actions/videos";

const VideoMetaData = ({ video: { snippet, statistics }, videoId, rating}) => {
  const { channelId, channelTitle, description, title, publishedAt } = snippet;
  const { viewCount, likeCount } = statistics;
  console.log(rating);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getChannelDetails(channelId));
    dispatch(getSubcriptionStatus(channelId));
  }, [dispatch, channelId]);

  const { snippet: channelSnippet, statistics: channelStatistics } =
    useSelector((state) => state.channelDetails.channel);
  const subscriptionStatus = useSelector(
    (state) => state.channelDetails.subscriptionStatus
  );

    const rate = (data) => {
      dispatch(rateVideo(videoId, data));
    }

  return (
    <div className="videoMetaData">
      <div className="videoMetaData_top">
        <h5>{title}</h5>
        <div className="videoMetaData_top_statistics">
          <span>
            {numeral(viewCount).format("0.a")} views ⋅{" "}
            {moment(publishedAt).fromNow()}
          </span>
          <div className="videoMetaData_top_statistics_likes">
            <span className="videoMetaData_top_statistics_likes_icon" onClick={() => rate(rating?.[0]?.rating ? rating[0].rating === "like" ? "none" : "like" : "none")}>
              {rating?.[0]?.rating ? rating[0].rating === "like" ? <ThumbUpIcon size={26}/> : <ThumbUpAltOutlinedIcon size={26}/> : <></>} {numeral(likeCount).format("0.a")}
            </span>
            <span className="videoMetaData_top_statistics_likes_icon" onClick={() => rate(rating?.[0]?.rating ? rating[0].rating === "dislike" ? "none" : "dislike" : "none")}>
              {rating?.[0]?.rating ? rating[0].rating === "dislike" ? <ThumbDownAltIcon size={26} /> : <ThumbDownOutlinedIcon size={26}/> : <></>} DISLIKE
            </span>
          </div>
        </div>
      </div>

      <hr />

      <div className="videoMetaData_channel">
        <div className="videoMetaData_channelInfo">
          <Avatar
            className="videoMetaData_channelInfo_avatar"
            alt="Remy Sharp"
            src={channelSnippet?.thumbnails?.default?.url}
          />
          <div>
            <h6 className="videoMetaData_channelInfo_text">{channelTitle}</h6>
            <p className="videoMetaData_channelInfo_text">
              {numeral(channelStatistics?.subscriberCount).format("0.a")}{" "}
              Subscribers
            </p>
          </div>
        </div>
        <div className="videoMetaData_subscribe">
          <Button variant="contained" color={subscriptionStatus ? "grey" : "error"}>
            {subscriptionStatus ? "Subscribed" : "Subscribe"}
          </Button>
        </div>
      </div>

      <hr />

      <div className="videoMetaData_description">
        <ShowMoreText
          lines={3}
          more="SHOW MORE"
          less="SHOW LESS"
          anchorClass="videoMetaData_description_showMoreText"
          expanded={false}
        >
          {description}
        </ShowMoreText>
      </div>
    </div>
  );
};

export default VideoMetaData;
