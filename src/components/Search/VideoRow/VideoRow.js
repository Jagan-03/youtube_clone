import moment from "moment";
import numeral from "numeral";
import React from "react";
import request from "../../../api";
import { useHistory } from "react-router-dom";

import "./videoRow.css";

const VideoRow = ({
  id,
  description,
  timestamp,
  channel,
  title,
  image,
}) => {

  const history = useHistory();
  const [views, setViews] = React.useState(null);
  const [duration, setDuration] = React.useState(null);

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

  
  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const openVideo = () => {
    history.push(`/watch/${id}`);
  }

  return (
    <div className="videoRow" onClick={openVideo}>
    <div className="videoRow_thumbnail">
        <img
          className="videoRow_thumbnail_image"
          src={image}
          alt={"title"}
        />
        <span className="videoRow_duration">{_duration}</span>
      </div>
      {/* <img src={image} alt={channel} className="videoRow_thumbnail"/> */}
      <div className="videoRow_text">
        <h5>{`${title.substring(0, 70)}...`}</h5>
        <p className="videoRow_headline">
        {numeral(views).format("0.a")} views ⋅ {moment(timestamp).fromNow()}
        </p>
        <p>{channel}</p>
        <p className="videoRow_description">{`${description.substring(0, 80)}...`}</p>
      </div>
    </div>
  );
};

export default VideoRow;
