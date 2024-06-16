import { createRouter, createWebHistory } from "vue-router";
import Layout from "../views/Layout.vue";
import HomeView from "../views/HomeView/index.vue";
import LoginInfo from "../views/LoginInfo/index.vue";
import { useLoginStore } from "@/stores/loginStore";
import { useMenuStore } from "@/stores/menuStore";

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
          meta: {
            requireAuth: true,
            key: "首页",
          },
        },
        {
          path: "/project",
          name: "project",
          component: () => import("../views/ProjectInfo/index.vue"), // 异步 懒加载
          meta: {
            requireAuth: true,
            key: "项目基础信息",
          },
        },
        {
          path: "/tunnel",
          name: "tunnel",
          component: () => import("../views/TunnelInfo/index.vue"),
          meta: {
            requireAuth: true,
            key: "隧道设计信息",
          },
        },
        {
          path: "/work",
          name: "work",
          component: () => import("../views/WorkManage/index.vue"),
          meta: {
            requireAuth: true,
            key: "工作监督管理",
          },
        },
        {
          path: "/build",
          name: "build",
          component: () => import("../views/BuildManage/index.vue"),
          meta: {
            requireAuth: true,
            key: "施工监控检测",
          },
        },
        {
          path: "/geological",
          name: "geological",
          component: () => import("../views/GeologicalInfo/index.vue"),
          meta: {
            requireAuth: true,
            key: "超前地质预报",
          },
        },
        {
          path: "/system",
          name: "system",
          component: () => import("../views/SystemManage/index.vue"),
          meta: {
            requireAuth: true,
            key: "系统信息管理",
          },
        },
        {
          path: "/info",
          name: "info",
          component: () => import("../views/UserCenter/index.vue"),
          meta: {
            requireAuth: true,
            key: "个人中心",
          },
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

/**
 * 路由权限控制
 */
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    const loginStore = useLoginStore();
    if (!loginStore.token) {
      // 判断本地是否存在token
      next({
        path: "/login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  //存储路由路径
  localStorage.setItem("active", to.path);
  if (to.meta.key) {
    //存储key信息
    const menuStore = useMenuStore();
    menuStore.breadcrumb = to.meta.key;
  }
});

export default router;
