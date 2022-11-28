import { createRouter, createWebHashHistory } from "vue-router";
import HomeComponent from './views/Home.vue';
import EditComponent from '@/components/user/Edit';
import CreateComponent from './components/user/Create';
import LoginComponent from './components/user/Login';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: { name: 'home' } },
    { path: '/home', name: 'home', component: HomeComponent },
    { path: '/create', name: 'create', component: CreateComponent },
    { path: '/login', name: 'login', component: LoginComponent },
    { path: '/edit/:id', name: 'edit', component: EditComponent },
  ],
})

export default router;
