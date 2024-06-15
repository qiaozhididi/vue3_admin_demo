import "./assets/init.css";
//引入element-plus 的css
import "element-plus/dist/index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
//pinia持久化
import piniaPersist from "pinia-plugin-persist";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist);

app.use(pinia);
app.use(router);

app.mount("#app");
