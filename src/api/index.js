import axios from "@/api/request";
import path from "@/api/path";

const api = {
  App: {
    getShadowBlogCommits() {
      return axios.get(path.App.shadowBlogCommits(), {baseURL: ''});
    },
    getImage() {
      return axios.get('', {
        baseURL: '',
        responseType: 'blob',
      });
      //.then(response => {
      //         // 将blob对象转换为URL
      //         // 将URL赋值给img标签的src属性
      //         document.getElementById('image').src = URL.createObjectURL(response.data);
      //       }).catch(error => {
      //         console.error('获取Banner失败:', error);
      //       });
    },
    getMusicList() {
      return axios.get(path.App.musicList(), {baseURL: '', responseType: "json"});
    },
    getLyricsFileContent(url) {
      return axios.get(path.App.lyricsFile(url), {baseURL: '', responseType: "text"});
    },
    getMusicFileContent(url) {
      return axios.get(path.App.musicFile(url), {
        baseURL: '',
        responseType: 'blob',
      });
    },
  }
};

export default api;
