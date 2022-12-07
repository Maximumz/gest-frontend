import { createRouter, createWebHistory } from "vue-router";
import UserComponent from './views/user/Index';
import AdminComponent from './views/admin/Index';
import PublicComponent from './views/public/Index';
import EditComponent from '@/components/user/Edit';
import CreateComponent from '@/components/user/Create';
import LoginComponent from '@/components/user/Login';
import LogoutComponent from '@/components/user/Logout';
import CreateNotable from '@/components/notable/Create';
import store from '@/store';

let routes = [];

if (store.getters.StateUser.user && store.getters.StateUser.user.role === 'admin') {
  routes = [
    { path: '/', redirect: { name: 'Admin' } },
    { path: '/', redirect: { name: 'Home' } },
    { path: '/login', redirect: { name: 'Admin' } },
    { path: '/admin', name: 'Admin', component: AdminComponent },
    { path: '/edit/:id', name: 'edit', component: EditComponent },
    { path: '/create-notable', name: 'Notables', component: CreateNotable },
    { path: '/logout', name: 'Logout', component: LogoutComponent },
  ];

} else if (store.getters.StateUser.user && store.getters.StateUser.user.role === 'user') {
  routes = [
    { path: '/', redirect: { name: 'Home' } },
    { path: '/login', redirect: { name: 'Home' } },
    { path: '/home', name: 'Home', component: UserComponent },
    { path: '/create-notable', name: 'Notables', component: CreateNotable },
    { path: '/logout', name: 'Logout', component: LogoutComponent },
  ];
} else {
  routes = [
    { path: '/', redirect: { name: 'Home' } },
    { path: '/logout', redirect: { name: 'Home' } },
    { path: '/home', name: 'Home', component: PublicComponent },
    { path: '/create', name: 'Create', component: CreateComponent },
    { path: '/login', name: 'Login', component: LoginComponent },
  ];
}

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router;
