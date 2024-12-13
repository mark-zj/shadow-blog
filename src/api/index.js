import axios from "@/api/request";
import path from "@/api/path";

const api = {
  App: {
    getShadowBlogCommits() {
      return axios.get(path.App.shadowBlogCommits(), {baseURL: ''});
    }
  }
};

export default api;
