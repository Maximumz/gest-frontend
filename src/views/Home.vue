<template>
    <div class="container-fluid">
      <div class="text-center">
        <h1>Gest Acount</h1>
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
                      <router-link :to="{name: 'Edit', params: {id: user.id}}" class="btn btn-sm btn-outline-secondary">Edit Account </router-link>
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
import { server } from "../helper";
import axios from "axios";

export default {
  data() {
    return {
      users: []
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      axios
        .get(`${server.baseURL}/api/users`)
        .then(data => (this.users = data.data));
    },
    deleteUser(id) {
      /* const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }; */
      axios
        .delete(`${server.baseURL}/api/users/`+id)
        .then(data => {
          console.log(data);
          window.location.reload();
        });
    }
  }
};

/*
<div v-if="users.length === 0">
     <h2> Account not found at the moment </h2>
 </div> */
</script>
