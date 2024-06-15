import { createRouter, createWebHistory } from "vue-router";
import Layout from "../views/Layout.vue";
import HomeView from "../views/HomeView/index.vue";
import LoginInfo from "../views/LoginInfo/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layout",
      component: Layout,
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
        },
        {
          path: "/project",
          name: "project",
          component: () => import("../views/ProjectInfo/index.vue"), // 异步 懒加载
        },
        {
          path: "/tunnel",
          name: "tunnel",
          component: () => import("../views/TunnelInfo/index.vue"),
        },
        {
          path: "/work",
          name: "work",
          component: () => import("../views/WorkManage/index.vue"),
        },
        {
          path: "/build",
          name: "build",
          component: () => import("../views/BuildManage/index.vue"),
        },
        {
          path: "/geological",
          name: "geological",
          component: () => import("../views/GeologicalInfo/index.vue"),
        },
        {
          path: "/system",
          name: "system",
          component: () => import("../views/SystemManage/index.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: LoginInfo,
    },
  ],
});

export default router;
