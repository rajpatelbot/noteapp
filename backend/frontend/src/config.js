import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://mern-note-taking-app.vercel.app/",
});
