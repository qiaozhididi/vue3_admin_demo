import { createI18n } from "vue-i18n";
import zh from "./lang/zh";
import en from "./lang/en";
const messages = {
  zh,
  en,
};

const i18n = createI18n({
  legacy: false, // 必须配置，否则报错,而且只能是false
  locale: localStorage.getItem("lang") || "zh", // 设置当前语言环境
  globalInjection: true, // 允许访问形式 $t 来访问
  messages,
});

export default i18n;
