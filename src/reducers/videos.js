export const homeVideos = (
  state = {
    videos: [],
    loading: false,
    nextPageToken: null,
    activeCategory: "All",
  },
  action
) => {
  switch (action.type) {
    case "HOME_VIDEOS_SUCCESS":
      return {
        ...state,
        videos:
          state.activeCategory === action.payload.category
            ? [...state.videos, ...action.payload.videos]
            : action.payload.videos,
        loading: false,
        nextPageToken: action.payload.nextPageToken,
        activeCategory: action.payload.category,
      };
    case "HOME_VIDEOS_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "HOME_VIDEOS_REQUEST":
      return { ...state, loading: true };
    default:
      return state;
  }
};

export const selectedVideo = (
  state = {
    loading: true,
    video: null,
  },
  action
) => {
  switch (action.type) {
    case "SELECTED_VIDEO_REQUEST":
      return { ...state, loading: true };
    case "SELECTED_VIDEO_SUCCESS":
      return { ...state, loading: false, video: action.payload };
    case "SELECTED_VIDEO_FAIL":
      return { ...state, video: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const relatedVideos = (
  state = {
    loading: true,
    videos: null,
  },
  action
) => {
  switch (action.type) {
    case "RELATED_VIDEOS_REQUEST":
      return { ...state, loading: true };
    case "RELATED_VIDEOS_SUCCESS":
      return { ...state, loading: false, videos: action.payload };
    case "RELATED_VIDEOS_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const searchedVideos = (
  state = {
    loading: true,
    videos: [],
  },
  action
) => {
  switch (action.type) {
    case "SEARCH_VIDEOS_REQUEST":
      return { ...state, loading: true };
    case "SEARCH_VIDEOS_SUCCESS":
      return { ...state, loading: false, videos: action.payload };
    case "SEARCH_VIDEOS_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const subscribedChannels = (
  state = {
    loading: true,
    channels: [],
  },
  action
) => {
  switch (action.type) {
    case "SUBSCRIPTIONS_CHANNEL_REQUEST":
      return { ...state, loading: true };
    case "SUBSCRIPTIONS_CHANNEL_SUCCESS":
      return { ...state, loading: false, channels: action.payload };
    case "SUBSCRIPTIONS_CHANNEL_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const channelVideos = (
  state = {
    loading: true,
    videos: [],
  },
  action
) => {
  switch (action.type) {
    case "CHANNEL_VIDEOS_REQUEST":
      return { ...state, loading: true };
    case "CHANNEL_VIDEOS_SUCCESS":
      return { ...state, loading: false, videos: action.payload };
    case "CHANNEL_VIDEOS_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
