/**
 * 存放所有网络请求地址
 */

const base = {
  baseUrl: "http://localhost:3000", //公共地址
  login: "/api/login", // 登录
  router: "/api/router", //用户权限菜单
  line: "/api/line", //图标Line地址
  projectInfo: "/api/project/all", //项目信息查询
  search: "/api/project/search", //搜索
  total: "/api/project/total", //页数
  addProject: "/api/project/add", //页数
};
export default base;
