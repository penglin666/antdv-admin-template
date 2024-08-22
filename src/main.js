import { createApp } from "vue";
import App from "./App.vue";
import "ant-design-vue/dist/reset.css";
import router from "./router";
import "./permision";

import stores from "./stores";

const app = createApp(App);

app.use(router);
app.use(stores);

app.mount("#app");
