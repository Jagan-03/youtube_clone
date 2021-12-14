export const channelDetails = (
  state = {
    loading: true,
    channel: {},
    subscriptionStatus: false,
  },
  action
) => {
  switch (action.type) {
    case "CHANNEL_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "CHANNEL_DETAILS_SUCCESS":
      return { ...state, loading: false, channel: action.payload };
    case "CHANNEL_DETAILS_FAIL":
      return { ...state, channel: null, loading: false, error: action.payload };
    case "SET_SUBSCRIPTION_STATUS":
      return { ...state, subscriptionStatus: action.payload };
    default:
      return state;
  }
};
