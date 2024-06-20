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

  //获取隧道项目信息
  getProjectInfo(params) {
    return axios.get(base.baseUrl + base.projectInfo, { params });
  },
  //搜索接口
  getSearch(params) {
    return axios.get(base.baseUrl + base.search, { params });
  },

  //获取页数总数
  getTotal() {
    return axios.get(base.baseUrl + base.total);
  },

  //添加项目信息
  getAddProject(params) {
    return axios.get(base.baseUrl + base.addProject, { params });
  },

  //删除项目信息
  getDeleteProject(params) {
    return axios.get(base.baseUrl + base.delProject, { params });
  },

  //项目预更新
  getPreProjectUpdate(params) {
    return axios.get(base.baseUrl + base.preProjectUpdate, { params });
  },

  //项目信息修改
  getProjectUpdate(id, params) {
    return axios.put(base.baseUrl + base.updateProject + id, params);
  },

  //隧道信息tree列表（一级）
  getTunnelList() {
    return axios.get(base.baseUrl + base.getTunnelList);
  },

  //隧道信息tree列表（二级）
  getTunnelListChild(params) {
    return axios.get(base.baseUrl + base.getTunnelListChild, { params });
  },

  //隧道信息内容
  getTunnelContent(params) {
    return axios.get(base.baseUrl + base.getTunnelContent, { params });
  },

  //隧道信息文件上传地址
  getTunnelUploadFilePath(params) {
    return axios.get(base.baseUrl + base.uploadFilePath, { params });
  },

  //pdf预览地址
  getPDFView(params) {
    return axios.get(base.baseUrl + base.getPDFView, { params });
  },

  //获取用户列表
  getUserList() {
    return axios.get(base.baseUrl + base.getUserList);
  },

  //搜索用户
  getSearchUser(params) {
    return axios.get(base.baseUrl + base.getUserInfo, { params });
  },

  //添加用户
  getAddUser(params) {
    return axios.get(base.baseUrl + base.getAddUser, { params });
  },
  
  //删除用户
  getDeleteUser(params) {
    return axios.get(base.baseUrl + base.getUserDel, { params });
  },
};

export default api;
