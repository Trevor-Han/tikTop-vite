import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import Vant from 'vant';
// import 'element-plus/dist/index.css'
import router from './router/router'
import 'vant/lib/index.css';
import 'amfe-flexible'

const app = createApp(App);

app.use(Vant);
app.use(router);
app.use(createPinia());
// app.config.globalProperties.$axios = axios // 自定义添加

app.mount('#app');
