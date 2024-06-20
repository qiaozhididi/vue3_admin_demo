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
  delProject: "/api/project/del", //删除项目信息
  preProjectUpdate: "/api/project/update/pre", //预更新项目信息
  updateProject: "/api/project/update/", //更新项目信息
  getTunnelList: "/api/tunnel/list", //隧道列表(tree一级)
  getTunnelListChild: "/api/tunnel/list/child", //隧道列表(tree二级)
  getTunnelContent: "/api/tunnel/content", //隧道内容"
  uploadFilePath: "/api/tunnel/content/urlpath", //上传文件地址
  getPDFView: "/api/tunnel/pdf", //pdf预览
  getUserList: "/api/user/list", //用户列表
  getUserInfo: "/api/user/userinfo", //用户搜索
  getUserDel: "/api/user/del", //删除用户
  getUserAdd: "/api/user/add", // 添加用户
  getUserUpdatePre: "/api/user/preview", //用户预更新
  getUserUpdate: "/api/user/update", //修改用户权限
};

export default base;
