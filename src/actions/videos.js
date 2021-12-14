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
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    dispatch({
      type: "SUBSCRIPTIONS_CHANNEL_SUCCESS",
      payload: data.items,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: "SUBSCRIPTIONS_CHANNEL_FAIL", payload: error });
  }
};

export const getVideosByChannel = (id) => async (dispatch) => {
  try {
    dispatch({ type: "CHANNEL_VIDEOS_REQUEST" });
    // 1. Getting the list of playlists
    const { data : { items } } = await request("/channels", {
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
        maxResults : 40
      },
    });
    console.log(data);
    dispatch({ type: "CHANNEL_VIDEOS_SUCCESS", payload: data.items });
  } catch (error) {
    console.log(error);
    dispatch({ type: "CHANNEL_VIDEOS_FAIL", payload: error });
  }
};