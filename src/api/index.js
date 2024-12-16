import axios from "@/api/request";
import path from "@/api/path";

const api = {
  App: {
    getShadowBlogCommits() {
      return axios.get(path.App.shadowBlogCommits(), {baseURL: ''});
    },
    getImage() {
      return axios.get('', {
        baseURL:'',
        responseType: 'blob',
      });
      //.then(response => {
      //         // 将blob对象转换为URL
      //         // 将URL赋值给img标签的src属性
      //         document.getElementById('image').src = URL.createObjectURL(response.data);
      //       }).catch(error => {
      //         console.error('获取Banner失败:', error);
      //       });
    }
  }
};

export default api;
