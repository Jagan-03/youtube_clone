import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./App.css";
// components
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import VideoSection from "./components/VideosSection/VideoSection";
import Search from "./components/Search/Search";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginScreen from "./components/login/login";
import WatchScreen from "./components/WatchScreen/WatchScreen";
import Channel from "./components/Channel/Channel";
import Subscriptions from "./components/Subscriptions/Subscriptions";
import LikedVideos from "./components/LikedVideos/LikedVideos";

const Layout = ({ children }) => {

  const [sidebar, toggleSidebar] = React.useState(false);

  const handleSidebar = () => {
    toggleSidebar(value => !value);
  }

  return (
    <>
      <Header handleSidebar={handleSidebar} />
      <div className="app_page">
        <Sidebar sidebar={sidebar} />
        {children}
      </div>
    </>
  );
};

function App() {
  const { accessToken, loading } = useSelector((state) => state.auth);
  const history = useHistory();

  React.useEffect(() => {
    if (!loading && !accessToken) {
      history.push("/auth");
    }
  }, [accessToken, loading, history]);

  return (
    <div className="app">
      <Switch>
      <Route path="/feed/likedVideos">
          <Layout>
            <LikedVideos />
          </Layout>
        </Route>
      <Route path="/feed/subscriptions">
          <Layout>
            <Subscriptions />
          </Layout>
        </Route>
       <Route path="/channel/:id">
          <Layout>
            <Channel />
          </Layout>
        </Route>
        <Route path="/search/:query">
          <Layout>
            <Search />
          </Layout>
        </Route>
        <Route path="/watch/:id">
          <Layout>
            <WatchScreen />
          </Layout>
        </Route>
        <Route path="/auth">
          <LoginScreen />
        </Route>
        <Route path="/">
          <Layout>
            <VideoSection />
          </Layout>
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
