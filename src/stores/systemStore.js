import { defineStore } from "pinia";
export const useSystemStore = defineStore("system", {
  state: () => {
    return {
      toggleStore: true,
    };
  },
  persist: {
    enabled: true,
    //本地持久化
    strategies: [
      {
        key: "system", //自定义key 存储
        storage: localStorage, //存储方式
      },
    ],
  },
});
