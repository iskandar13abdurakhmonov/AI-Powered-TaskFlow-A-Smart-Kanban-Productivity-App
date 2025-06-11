import { createApp } from 'vue'
import App from './App.vue'
import naive from 'naive-ui'
import './style.css'
import {createPinia} from "pinia";
import { createRouter, createWebHistory} from "vue-router";
import {routes} from "./router";

const pinia = createPinia()
const app = createApp(App)

const router = createRouter({
    history: createWebHistory(),
    routes
})

app.use(pinia)
app.use(naive)
app.use(router)
app.mount('#app')
