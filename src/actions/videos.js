import request from "../api";

export const getPopularVideos = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "HOME_VIDEOS_REQUEST" });
    const { data } = await request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "IN",
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
      },
    });

    dispatch({
      type: "HOME_VIDEOS_SUCCESS",
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: "HOME_VIDEOS_FAIL", payload: error });
  }
};

export const getVideoById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "SELECTED_VIDEO_REQUEST" });
    const { data } = await request("/videos", {
      params: {
        part: "snippet,statistics",
        id: id,
      },
    });
    dispatch({ type: "SELECTED_VIDEO_SUCCESS", payload: data.items[0] });
  } catch (error) {
    console.log(error);
    dispatch({ type: "SELECTED_VIDEO_FAIL", payload: error });
  }
};

export const getRelatedVideos = (id) => async (dispatch) => {
  try {
    dispatch({ type: "RELATED_VIDEOS_REQUEST" });
    const { data } = await request("/search", {
      params: {
        part: "snippet",
        relatedToVideoId: id,
        maxResults: 15,
        type: "video",
      },
    });
    dispatch({ type: "RELATED_VIDEOS_SUCCESS", payload: data.items });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RELATED_VIDEOS_FAIL", payload: error });
  }
};

export const getVideoBySearch = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: "SEARCH_VIDEOS_REQUEST" });
    const { data } = await request("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        q: keyword,
        type: "video,channel",
      },
    });
    dispatch({ type: "SEARCH_VIDEOS_SUCCESS", payload: data.items });
  } catch (error) {
    console.log(error);
    dispatch({ type: "SEARCH_VIDEOS_FAIL", payload: error });
  }
};

export const getSubscribedChannels = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "SUBSCRIPTIONS_CHANNEL_REQUEST" });
    const { data } = await request("/subscriptions", {
      params: {
        part: "snippet,contentDetails",
        mine: true,
        maxResults: 10,
        pageToken: getState().subscribedChannels.nextPageToken,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    console.log(data);
    dispatch({
      type: "SUBSCRIPTIONS_CHANNEL_SUCCESS",
      payload: {
        channels: data.items,
        nextPageToken: data.nextPageToken,
        kind: data.kind,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: "SUBSCRIPTIONS_CHANNEL_FAIL", payload: error });
  }
};

export const getVideosByChannel = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "CHANNEL_VIDEOS_REQUEST" });
    // 1. Getting the list of playlists
    const {
      data: { items },
    } = await request("/channels", {
      params: {
        part: "contentDetails",
        id,
      },
    });
    const playlistId = items[0].contentDetails.relatedPlaylists.uploads;
    // 2. Getting all the videos
    const { data } = await request("/playlistItems", {
      params: {
        part: "snippet,contentDetails",
        playlistId,
        maxResults: 30,
        pageToken: getState().channelVideos.nextPageToken,
      },
    });
    console.log(data);
    dispatch({
      type: "CHANNEL_VIDEOS_SUCCESS",
      payload: {
        videos: data.items,
        playlistId,
        nextPageToken: data.nextPageToken,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: "CHANNEL_VIDEOS_FAIL", payload: error });
  }
};

export const getLikedVideos = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "LIKED_VIDEOS_REQUEST" });
    const { data } = await request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        myRating: "like",
        maxResults: 20,
        pageToken: getState().likedVideos.nextPageToken,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    console.log(data);
    dispatch({
      type: "LIKED_VIDEOS_SUCCESS",
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        totalResults: data.pageInfo.totalResults,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LIKED_VIDEOS_FAIL", payload: error });
  }
};

export const getVideoRating = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "VIDEO_RATING_REQUEST" });
    const { data } = await request("/videos/getRating", {
      params: {
        id,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    dispatch({
      type: "VIDEO_RATING_SUCCESS",
      payload: {
        rating: data.items,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: "VIDEO_RATING_FAIL", payload: error });
  }
};

export const rateVideo = (id, rating) => async (dispatch, getState) => {
  try {
    await request.post("/videos/rate", { id : id, rating : rating}, {
      params: {
        id,
        rating,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    dispatch({type: "RATE_VIDEO_SUCCESS"});
    setTimeout(() => {
      dispatch(getVideoRating(id));
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: "RATE_VIDEO_FAIL", payload: error });
  }
};
