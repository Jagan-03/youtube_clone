import { combineReducers } from "redux";

import store from "./store";
import auth from "./auth";
import { homeVideos, selectedVideo, relatedVideos, searchedVideos, subscribedChannels, channelVideos, likedVideos, videoRating } from "./videos";
import { channelDetails } from "./channel";
import { comments } from "./comments";

export default combineReducers({
  store,
  auth,
  homeVideos,
  selectedVideo,
  relatedVideos,
  searchedVideos,
  channelDetails,
  channelVideos,
  likedVideos,
  videoRating,
  comments,
  subscribedChannels
});
