import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import { StateKey, store } from "./store";
// import 'element-plus/dist/index.css';
// //import 'element-plus/dist/base.css';
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus';

const app = createApp(App)

const plugins = [
    ElLoading,
    ElMessage,
    ElMessageBox,
];


plugins.forEach(plugin => {
    app.use(plugin)
})

app.use(router);
app.use(store, StateKey);
app.mount('#app')
