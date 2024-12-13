import axios from "axios";

const instance = axios.create({
  timeout: 10000,
  baseURL: 'http://localhost:5172/api/'
});

// 发送数据之前
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

instance.interceptors.response.use(
  response => {
    const method = response.config.method.toUpperCase(); // get post put delete
    // 系统响应成功唯一状态码
    if (response.status === 200) {
      return Promise.resolve(response.data);
    }
    return Promise.reject(response);
  },
  // 系统响应失败
  error => {
    return Promise.reject(error);
  }
)


export default instance;
