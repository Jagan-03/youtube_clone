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
      payload: {
        subscriptionStatus : data.items.length !== 0,
        subscriptionId : data?.items[0]?.id
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const subscribeChannel = (channelId) => async (dispatch, getState) => {
  try {

    const obj = {
      "snippet": {
        "resourceId": {
          "kind": "youtube#channel",
          "channelId": channelId
        }
      }
    }

    await request.post("/subscriptions", obj, {
      params: {
        part: "snippet",
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    dispatch({ type: "SUBSCRIBE_CHANNEL_SUCCESS" });
    setTimeout(() => {
      dispatch(getSubcriptionStatus(channelId));
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: "SUBSCRIBE_CHANNEL_FAIL", payload: error });
  }
};

export const unsubscribeChannel = (channelId) => async (dispatch, getState) => {
  try {

    await request.delete("/subscriptions", {
      params: {
        id : channelId,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    dispatch({ type: "UNSUBSCRIBE_CHANNEL_SUCCESS" });
    setTimeout(() => {
      dispatch(getSubcriptionStatus(channelId));
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: "UNSUBSCRIBE_CHANNEL_FAIL", payload: error });
  }
};