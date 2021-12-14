import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import "./login.css";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { login } from "../../actions/auth";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleLogin = () => {
    dispatch(login());
  };

  React.useEffect(() => {
    if (accessToken) {
      history.push("/");
    }
  }, [accessToken, history]);

  return (
    <div className="login">
      <div className="form">
        <img
          className="login_image"
          alt="youtube_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
        />

        <button className="login_button" onClick={handleLogin}>
          <GoogleIcon /> - Sign in
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
