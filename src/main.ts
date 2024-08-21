import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from "@/App.vue";
import router from "@/router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const pinia = createPinia().use(piniaPluginPersistedstate);

createApp(App).use(pinia).use(ElementPlus).use(router).mount("#app");
