import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import { StateKey, useStore } from "./store";
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus';
import { createPinia } from 'pinia';


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
app.use(createPinia())
// app.use(useStore, StateKey);
app.mount('#app')
