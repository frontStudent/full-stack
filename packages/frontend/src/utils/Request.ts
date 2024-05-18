import axios from "axios";
import { message } from "antd";
axios.defaults.baseURL = "http://localhost:3003";

axios.interceptors.request.use(
  (config) => {
    if (["/user/login", "/user/register"].includes(config.url as string))
      return config;
    const token = window.localStorage.getItem("token");
    return {
      ...config,
      headers: {
        authorization: token ? String(token) : "",
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    const res = response?.data;
    if (res?.data?.token) {
      window.localStorage.setItem("token", res?.data?.token);
      message.success((res as any)?.message);
      window.location.href = "/#/home";
    }
    return res;
  },
  function (error) {
    const response = error?.response;
    if (response?.data?.statusCode === 401) {
      window.location.href = "/#/login";
      message.error(response?.data?.message || "登录过期，请重新登录");
    } else {
      message.error(response?.data?.message || "请求失败");
    }
    // 如果不加这一行 即使请求失败时依然会触发then方法 导致弹出两条message报错
    return Promise.reject(error);
  }
);

export default axios;
