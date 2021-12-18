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
    nextPageToken: "",
    kind: null,
    activeCategory: "All",
  },
  action
) => {
  switch (action.type) {
    case "SUBSCRIPTIONS_CHANNEL_REQUEST":
      return { ...state, loading: true };
    case "SUBSCRIPTIONS_CHANNEL_SUCCESS":
      return {
        ...state,
        channels:
          state.kind === action.payload.kind
            ? [...state.channels, ...action.payload.channels]
            : action.payload.channels,
        loading: false,
        kind: action.payload.kind,
        nextPageToken: action.payload.nextPageToken,
        activeCategory: action.payload.category,
      };
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
    nextPageToken: "",
    playlistId: null,
    activeCategory: "All",
  },
  action
) => {
  switch (action.type) {
    case "CHANNEL_VIDEOS_REQUEST":
      return { ...state, loading: true };
    case "CHANNEL_VIDEOS_SUCCESS":
      if (action.payload.playlistId !== state.playlistId)
        state.activeCategory = "All";
      return {
        ...state,
        videos:
          state.activeCategory === action.payload.category
            ? [...state.videos, ...action.payload.videos]
            : action.payload.videos,
        loading: false,
        playlistId: action.payload.playlistId,
        nextPageToken: action.payload.nextPageToken,
        activeCategory: action.payload.category,
      };
    case "CHANNEL_VIDEOS_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const likedVideos = (
  state = {
    loading: true,
    videos: [],
    nextPageToken: "",
    activeCategory: "All",
    totalResults: 1,
  },
  action
) => {
  switch (action.type) {
    case "LIKED_VIDEOS_REQUEST":
      return { ...state, loading: true };
    case "LIKED_VIDEOS_SUCCESS":
      return {
        ...state,
        videos:
          state.activeCategory === action.payload.category
            ? [...state.videos, ...action.payload.videos]
            : action.payload.videos,
        loading: false,
        nextPageToken: action.payload.nextPageToken,
        activeCategory: action.payload.category,
        totalResults: action.payload.totalResults,
      };
    case "LIKED_VIDEOS_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const videoRating = (
  state = {
    loading: true,
    rating: [],
  },
  action
) => {
  switch (action.type) {
    case "VIDEO_RATING_REQUEST":
      return { ...state, loading: true };
    case "VIDEO_RATING_SUCCESS":
      return {
        ...state,
        rating: action.payload.rating,
      };
    case "VIDEO_RATING_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

