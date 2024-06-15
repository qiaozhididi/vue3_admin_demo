import { defineStore } from "pinia";

export const useLoginStore = defineStore("login", {
  state: () => {
    return {
      token: "",
      permission: "",
      username: "",
    };
  },
  persist: {
    enabled: true,
    //本地持久化
    strategies: [
      {
        key: "login", //自定义key 存储
        storage: localStorage, //存储方式
      },
    ],
  },
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    setToken(token) {
      this.token = token;
    },
  },
});
