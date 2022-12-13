<template>
    <div class="container mt-5">
      <div class="text-center">
        <h1>GEST Accounts</h1>
      </div>
      <div id="user-table" class="">
          <table class="table table-bordered">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in this.users" v-bind:key="user.id">
                <td>{{ user.username }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group" style="margin-bottom: 20px;">
                      <router-link :to="{name: 'Edit User', params: {id: user.id}}" class="btn btn-sm btn-outline-secondary">Edit Account </router-link>
                      <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteUser(user.id)">Delete Account</button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
</template>
<script>
import { server } from "@/helper";
import router from "@/router";
import axios from "axios";
import store from "@/store";

const accessToken = store.getters.StateUser.user ? store.getters.StateUser.user.access_token : null;

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Bearer ' + accessToken
  }
};

export default {
  data() {
    return {
      users: []
    };
  },
  mounted() {
    if (!accessToken) {
      return router.go(0);
    }
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      axios
        .get(`${server.baseURL}/api/admin/users`, config)
        .then(data => (this.users = data.data))
        .catch(error => (console.log(error)));
    },
    deleteUser(id) {
      axios
        .delete(`${server.baseURL}/api/admin/users/`+id, config)
        .then(data => {
          console.log(data);
          window.location.reload();
        });
    }
  }
};
</script>
