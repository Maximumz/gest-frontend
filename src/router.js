import { createRouter, createWebHistory } from "vue-router";
import PublicComponent from '@/views/public/Index';
import EditUserComponent from '@/views/user/Edit';
import CreateComponent from '@/views/user/Create';
import LoginComponent from '@/views/user/Login';
import LogoutComponent from '@/views/user/Logout';
import CreateNotable from '@/views/notable/Create';
import EditNotableComponent from '@/views/notable/Edit';
import ManageUsers from "@/views/user/admin/ManageUsers";
import Inspire from "@/views/notable/Inspire";
import store from '@/store';
import jwt_decode from 'jwt-decode';

let routes = [];

if (store.getters.isAuthenticated && store.getters.StateUser.role === 'admin') {
  routes = [
    { path: '/', redirect: { name: 'Home' } },
    { path: '/login', redirect: { name: 'Home' } },
    { path: '/home', name: 'Home', component: PublicComponent },
    { path: '/inspire', name: 'Be Inspired', component: Inspire },
    { path: '/edit-user/:id', name: 'Edit User', component: EditUserComponent },
    { path: '/edit-notable/:id', name: 'Edit Notable', component: EditNotableComponent },
    { path: '/create-notable', name: 'Create Notables', component: CreateNotable },
    { path: '/admin', name: 'Admin', component: ManageUsers },
    { path: '/logout', name: 'Logout', component: LogoutComponent },
  ];

} else if (store.getters.isAuthenticated && store.getters.StateUser.role === 'user') {
  routes = [
    { path: '/', redirect: { name: 'Home' } },
    { path: '/login', redirect: { name: 'Home' } },
    { path: '/home', name: 'Home', component: PublicComponent },
    { path: '/inspire', name: 'Be Inspired', component: Inspire },
    { path: '/create-notable', name: 'Create Notables', component: CreateNotable },
    { path: '/logout', name: 'Logout', component: LogoutComponent },
  ];
} else {
  routes = [
    { path: '/', redirect: { name: 'Home' } },
    { path: '/inspire', redirect: { name: 'Login' } },
    { path: '/logout', redirect: { name: 'Login' } },
    { path: '/create-notable', redirect: { name: 'Login' } },
    { path: '/home', name: 'Home', component: PublicComponent },
    { path: '/create', name: 'Create', component: CreateComponent },
    { path: '/login', name: 'Login', component: LoginComponent },
  ];
}

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

router.beforeEach(async (to, from) => {
  if (store.getters.isAuthenticated) {
    // If the jwt token has expired we will log them out
    const jwtData = jwt_decode(store.getters.StateUser.access_token);
    if ((jwtData.exp < Math.round(Date.now() / 1000))) {
     if (to.name !== 'Logout') {
        return { name: 'Logout' };
      }
    }
  }
});

export default router;
