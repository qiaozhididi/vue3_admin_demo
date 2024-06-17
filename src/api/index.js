import axios from "../utils/request.js";
import base from "./base.js";

const api = {
  //登录
  getLogin(params) {
    return axios.post(base.baseUrl + base.login, params);
  },
  //用户权限菜单
  getRouter(params) {
    return axios.get(base.baseUrl + base.router, { params });
  },
  //获取line图表数据
  getLineData() {
    return axios.get(base.baseUrl + base.line);
  },
};

export default api;
