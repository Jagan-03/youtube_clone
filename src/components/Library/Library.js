import React from 'react'

import "./library.css";

import firebase from "firebase/compat/app";
import { onSnapshot } from "firebase/firestore";
import VideoCard from "../VideosSection/VideoCard/VideoCard";
import { useDispatch, useSelector } from "react-redux";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { getLikedVideos } from '../../actions/videos';

const Library = () => {

    const [videos, setVideos] = React.useState([]);
    
    const { user } = useSelector(state => state.auth);
    React.useEffect(() => {
      const db = firebase.firestore();
      // db.collection("history").where("userId", "==", user.id).get().then((snapshot) => setVideos(snapshot.docs.map(doc => doc.data())));
      onSnapshot(db.collection("history").where("userId", "==", user?.id), (snapshot) => setVideos(snapshot.docs.map( doc => doc.data())));
    }, [user?.id]);

    const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getLikedVideos());
  }, [dispatch]);

    const { videos : likedVideos } = useSelector(state => state.likedVideos);
    console.log(likedVideos);

    return (
        <div className="library w-100">
            <div className="library_history ps-5 px-5">
                <div className="library_history_header d-flex align-items-center justify-content-between border-bottom">
                    <h6><i class="fas fa-history"></i> History</h6>
                    <a href="/feed/history">SEE ALL</a>
                </div>
                <div className="library_history_list pt-4 d-flex flex-wrap">
                {videos.slice(0, 8).map((video) => (
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
            </div>
            <div className="library_likedVideos ps-5 px-5">
            <div className="library_likedVideos_header d-flex align-items-center justify-content-between border-bottom">
                    <h6><ThumbUpAltOutlinedIcon /> Liked Videos</h6>
                    <a href="/feed/likedVideos">SEE ALL</a>
                </div>
                <div className="library_likedVideos_list pt-4 d-flex flex-wrap">
                {likedVideos.slice(0, 8).map((video) => (
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
            </div>
        </div>
    )
}

export default Library;
