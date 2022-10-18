import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import { createPinia } from 'pinia';
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';
// import 'element-plus/es/components/message/style/css'


VMdEditor.use(githubTheme, {
    Hljs: hljs,
});

const app = createApp(App);

app.use(router);
app.use(createPinia())
app.mount('#app')
