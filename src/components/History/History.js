import React from "react";

import "./history.css";

import firebase from "firebase/compat/app";
import { onSnapshot } from "firebase/firestore";
import VideoCard from "../VideosSection/VideoCard/VideoCard";
import { useSelector } from "react-redux";

const History = () => {

    const [videos, setVideos] = React.useState([]);
    
    const { user } = useSelector(state => state.auth);
    React.useEffect(() => {
      const db = firebase.firestore();
      // db.collection("history").where("userId", "==", user.id).get().then((snapshot) => setVideos(snapshot.docs.map(doc => doc.data())));
      onSnapshot(db.collection("history").where("userId", "==", user.id), (snapshot) => setVideos(snapshot.docs.map( doc => doc.data())));
    }, [user.id]);

  return <div className="history">
      <div className="history_header d-flex align-items-center border-bottom">
                    <h6><i class="fas fa-history"></i> History</h6>
                </div>
      <div className="history_videos pt-4">
          {videos.map((video) => (
            <VideoCard
              key={video.videoId}
              id={video.videoId}
              title={video.title}
              publishedAt={video.publishedAt}
              channelID={video.channelID}
              image={video.image}
            />
          ))}
      </div>
  </div>;
};

export default History;
