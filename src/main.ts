import { createApp, type Directive } from "vue";
import App from "./App.vue";
import router from "./router";
import { setupStore } from "@/store";
import { getPlatformConfig } from "./config";
import { MotionPlugin } from "@vueuse/motion";
import { useElementPlus } from "@/plugins/elementPlus";
import { injectResponsiveStorage } from "@/utils/responsive";
import Table from "@pureadmin/table";
// import PureDescriptions from "@pureadmin/descriptions";

import "./style/reset.scss";
import "./style/index.scss";
import "./style/tailwind.css";
import "element-plus/dist/index.css";
import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.css";

import * as directives from "@/directives";
import {
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon
} from "./components/ReIcon";
import { Auth } from "@/components/ReAuth";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import VueTippy from "vue-tippy";

let app;

async function bootstrap() {
  // 创建并配置应用实例
  app = createApp(App);

  // 注册自定义指令
  Object.keys(directives).forEach(key => {
    app.directive(key, (directives as { [key: string]: Directive })[key]);
  });

  // 注册全局组件
  app.component("IconifyIconOffline", IconifyIconOffline);
  app.component("IconifyIconOnline", IconifyIconOnline);
  app.component("FontIcon", FontIcon);
  app.component("Auth", Auth);

  // 使用插件
  app.use(VueTippy);

  // 获取平台配置并初始化应用
  const config = await getPlatformConfig(app);
  setupStore(app);
  app.use(router);
  await router.isReady();
  injectResponsiveStorage(app, config);
  app.use(MotionPlugin).use(useElementPlus).use(Table);

  // 挂载应用
  app.mount("#app");
}

// 暴露一个重新渲染根组件的方法
export function reloadApp() {
  if (app) {
    app.unmount(); // 卸载当前应用实例
  }
  bootstrap(); // 重新挂载根组件
}

// 首次启动应用
bootstrap();
