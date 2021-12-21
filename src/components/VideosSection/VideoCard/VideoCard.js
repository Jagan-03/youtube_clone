import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import "./videocard.css";

import Avatar from "@mui/material/Avatar";
import request from "../../../api";

import moment from "moment";
import numeral from "numeral";
import { useSelector } from "react-redux";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import db from "../../../firebase";

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
  const {pathname} = useLocation();

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

  const { user } = useSelector(state => state.auth);
  
  const openWatchScreen = async () => {
    const docRef = doc(db, "history", id+user.id);
    const payload = { videoId : id, title, publishedAt, channelID, image, userId : user.id };
    await setDoc(docRef, payload);
    history.push(`/watch/${id}`);
  }

  const removeFromHistory = async (e) => {
    e.stopPropagation();
    const docRef = doc(db, "history", id+user.id);
    await deleteDoc(docRef);
  }

  return (
    <div className="videoCard" onClick={openWatchScreen}>
      <div className="videoCard_top">

      {pathname === "/feed/history" ? <div
        class="bg-image hover-overlay ripple shadow-1-strong"
        data-mdb-ripple-color="light"
      >
      <img className="videoCard_thumbnail" src={image} alt="video_thumbnai" />
        <span className="videoCard_duration">{_duration}</span>
          <div class="mask">
          <span className="videoCard_remove" onClick={removeFromHistory}><i class="fas fa-times"></i></span>
          </div>
      </div> : 
      <>
      <img className="videoCard_thumbnail" src={image} alt="video_thumbnai" />
        <span className="videoCard_duration">{_duration}</span>
      </>
      }
            
        
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
