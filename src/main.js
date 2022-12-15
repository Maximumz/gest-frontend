import { createApp } from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import cors from 'cors';
import 'bootstrap';
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';

const app = createApp(App)
app.use(cors)
app.use(store)
app.use(router)
app.component('BootstrapIcon', BootstrapIcon)
app.mount('#app')