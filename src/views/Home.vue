<template>
    <div class="container-fluid">
      <div class="text-center">
        <h1>Nest Customer List App Tutorial</h1>
       <p> Built with Nest.js, Vue.js and MongoDB</p>
       <div v-if="user.length === 0">
            <h2> Account not found at the moment </h2>
        </div>
      </div>
      <div class="">
          <table class="table table-bordered">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ user.username }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group" style="margin-bottom: 20px;">
                      <router-link :to="{name: 'Edit', params: {id: user._id}}" class="btn btn-sm btn-outline-secondary">Edit Account </router-link>
                      <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteUser(user._id)">Delete Account</button>
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
      user: []
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      axios
        .get(`${server.baseURL}/api/users`)
        .then(data => (this.user = data.data));
    },
    deleteCustomer(id) {
      axios
        .delete(`${server.baseURL}/user/delete?userID=${id}`)
        .then(data => {
          console.log(data);
          window.location.reload();
        });
    }
  }
};
</script>
