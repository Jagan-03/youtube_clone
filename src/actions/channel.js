import request from "../api";

export const getChannelDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "CHANNEL_DETAILS_REQUEST" });
    const { data } = await request("/channels", {
      params: {
        part: "snippet,statistics,contentDetails",
        id,
      },
    });
    dispatch({ type: "CHANNEL_DETAILS_SUCCESS", payload: data.items[0] });
  } catch (error) {
    console.log(error);
    dispatch({ type: "CHANNEL_DETAILS_FAIL", payload: error });
  }
};

export const getSubcriptionStatus = (id) => async (dispatch, getState) => {
  try {
    const { data } = await request("/subscriptions", {
      params: {
        part: "snippet",
        forChannelId: id,
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    dispatch({
      type: "SET_SUBSCRIPTION_STATUS",
      payload: data.items.length !== 0,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
