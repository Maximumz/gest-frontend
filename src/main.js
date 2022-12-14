import { createApp } from 'vue';
import App from './App';
import router from './router';
import store from '@/store';
import cors from 'cors';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App)
app.use(cors)
app.use(store)
app.use(router)
app.mount('#app')