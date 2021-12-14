import React from "react";
import { useParams } from "react-router-dom";
import Comments from "../Comments/Comments";
import VideoHorizontal from "../VideoHorizontal/VideoHorizontal";
import VideoMetaData from "../VideoMetaData/VideoMetaData";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedVideos, getVideoById } from "../../actions/videos";

import "./watchScreen.css";

const WatchScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getVideoById(id));
    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);

  const { video, loading } = useSelector((state) => state.selectedVideo);

  const { videos, loading: relatedVideosLoading } = useSelector((state) => state.relatedVideos);

  return (
    <div className="watchScreen">
      <div className="watchScreen_player">
        <div className="watchScreen_video">
          <iframe
            title={video?.snippet?.title}
            allowFullScreen
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
          ></iframe>
        </div>
        {!loading ? (
          <VideoMetaData video={video} videoId={id} />
        ) : (
          <h5>Loading...</h5>
        )}
        <hr />
        <Comments
          videoId={id}
          totalComments={video?.statistics?.commentCount}
        />
      </div>
      <div className="watchScreen_relatedVideos">
        <h3 className="watchScreen_relatedVideos_header">Related videos</h3>
        {!relatedVideosLoading && videos?.filter(video => video.snippet).map((video) => (
          <VideoHorizontal video={video} key={video.id.videoId}/>
        ))}
      </div>
    </div>
  );
};

export default WatchScreen;
