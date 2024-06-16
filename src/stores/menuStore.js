import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", {
  state: () => {
    return {
      isCollapse: false,
      breadcrumb: "首页",
      menus: [],
    };
  },
  persist: {
    enabled: true,
    //本地持久化
    strategies: [
      {
        key: "menus", //自定义key 存储
        storage: localStorage, //存储方式
      },
    ],
  },
});
