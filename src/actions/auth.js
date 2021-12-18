import { firebase } from "../firebase";

export const login = () => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");

    const res = await firebase.auth().signInWithPopup(provider);

    console.log(res);

    const accessToken = res.credential.accessToken;
    const profile = {
      name: res.additionalUserInfo.profile.name,
      photoURL: res.additionalUserInfo.profile.picture,
    };

    sessionStorage.setItem("ytc-access-token", accessToken);
    sessionStorage.setItem("ytc-profile", JSON.stringify(profile));

    dispatch({ type: "LOGIN_SUCCESS", payload: accessToken });
    dispatch({ type: "LOAD_PROFILE", payload: profile });
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await firebase.auth().signOut();
    dispatch({ type: "LOGOUT" });

    sessionStorage.removeItem("ytc-access-token");
    sessionStorage.removeItem("ytc-profile");
  } catch (error) {
    console.log(error);
  }
};
