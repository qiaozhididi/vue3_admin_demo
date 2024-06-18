import "./assets/init.css";
//引入element-plus 的css
import "element-plus/dist/index.css";
import elementIcon from "./plugins/icons.js";

import { createApp } from "vue";
import { createPinia } from "pinia";

//引入自定义Echarts
import echarts from "./plugins/echarts.js";

//pinia持久化
import piniaPersist from "pinia-plugin-persist";

// i18n国际化
import Vuei18n from "./locales/i18n.js";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist);

app.use(pinia);
app.use(router);
app.use(elementIcon);
app.use(echarts);
app.use(Vuei18n);

app.mount("#app");
