const manageRouter = {
  path: "/work",
  name: "work",
  component: () => import("../views/WorkManage/index.vue"),
  meta: {
    requireAuth: true,
    key: "工作监督管理",
  },
};
export default manageRouter;
