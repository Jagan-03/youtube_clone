import axios from "axios";

const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: {
    key: "AIzaSyA0nYwqnACA5VOlZGqqIjbV0YRCK12bn3g",
  },
});

export default request;