import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import './assets/style/element_theme/theme.scss';
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App).use(store).use(router)
app.use(ElementPlus)
app.mount('#app')
