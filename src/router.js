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

if (store.getters.StateUser.user && store.getters.StateUser.user.role === 'admin') {
  routes = [
    { path: '/', redirect: { name: 'Home' } },
    { path: '/login', redirect: { name: 'Home' } },
    { path: '/home', name: 'Home', component: PublicComponent },
    { path: '/inspire', name: 'Inspire', component: Inspire },
    { path: '/edit-user/:id', name: 'Edit User', component: EditUserComponent },
    { path: '/edit-notable/:id', name: 'Edit Notable', component: EditNotableComponent },
    { path: '/create-notable', name: 'Notables', component: CreateNotable },
    { path: '/admin', name: 'Admin', component: ManageUsers },
    { path: '/logout', name: 'Logout', component: LogoutComponent },
  ];

} else if (store.getters.StateUser.user && store.getters.StateUser.user.role === 'user') {
  routes = [
    { path: '/', redirect: { name: 'Home' } },
    { path: '/login', redirect: { name: 'Home' } },
    { path: '/home', name: 'Home', component: PublicComponent },
    { path: '/inspire', name: 'Inspire', component: Inspire },
    { path: '/create-notable', name: 'Notables', component: CreateNotable },
    { path: '/logout', name: 'Logout', component: LogoutComponent },
  ];
} else {
  routes = [
    { path: '/', redirect: { name: 'Home' } },
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
  if (store.getters.StateUser.user && store.getters.StateUser.user.access_token) {
    // If the jwt token has expired we will log them out
    const jwtData = jwt_decode(store.getters.StateUser.user.access_token);
    if ((jwtData.exp < Math.round(Date.now() / 1000))) {
      store.getters.StateUser.user.access_token = null;
      return { name: 'Logout' }
    }
  }
});

export default router;
