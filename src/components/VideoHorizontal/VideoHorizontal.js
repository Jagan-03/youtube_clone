import React from "react";

import "./videoHorizontal.css";

import request from "../../api";

import moment from "moment";
import numeral from "numeral";
import { useHistory } from "react-router";
import { doc, setDoc } from "firebase/firestore";
import db from "../../firebase";
import { useSelector } from "react-redux";

const VideoHorizontal = ({video}) => {
  
  const { id, snippet : { channelTitle, channelId, title, publishedAt, thumbnails : {medium}} } = video;

  const [views, setViews] = React.useState(null);
  const [duration, setDuration] = React.useState(null);

  React.useEffect(() => {
    const getVideoDetails = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id.videoId,
        },
      });
      setViews(items[0].statistics.viewCount);
      setDuration(items[0].contentDetails.duration);
    };
    getVideoDetails();
  }, [id]);

  
  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const { user } = useSelector(state => state.auth);

  const history = useHistory();
  const handleClick = async () => {
    const docRef = doc(db, "history", id.videoId+user.id);
    const payload = { videoId : id.videoId, title, publishedAt, channelID: channelId, image : medium.url, userId : user.id };
    await setDoc(docRef, payload);
    history.push(`/watch/${id.videoId}`);
  }

  return (
    <div className="videoHorizontal" onClick={handleClick}>
      <div className="videoHorizontal_thumbnail">
        <img
          className="videoHorizontal_thumbnail_image"
          src={medium.url}
          alt={title}
        />
        <span className="videoCard_duration">{_duration}</span>
      </div>
      <div className="videoHorizontal_description">
        <h6>{`${title.substring(0, 40)}...`}</h6>
        <p>{channelTitle}</p>
        <p>
          {numeral(views).format("0.a")} views ⋅ {moment(publishedAt).fromNow()}
        </p>
      </div>
    </div>
  );
};

export default VideoHorizontal;
