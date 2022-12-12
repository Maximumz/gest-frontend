<template>
  <div class="container mt-5">
    <div class="col-md-12 form-wrapper">
        <h2> Create Notable </h2>
        <form id="create-post-form" @submit.prevent="validateData">
          <div class="form-group col-md-12">
            <label for="title"> Title </label>
            <input type="text" id="title" v-model="this.notable.title" name="title" class="form-control" placeholder="Enter your Title">
          </div>
          <div class="form-group col-md-12">
            <label for="title"> Content </label>
            <input type="text-area" id="content" v-model="this.notable.content" name="title" class="form-control" placeholder="Enter your inspirational thought">
          </div>
          <div class="form-group col-md-12">
            <label for="title"> Author </label>
            <input type="text" id="author" v-model="this.notable.author" name="title" class="form-control" placeholder="Enter your name or another author">
          </div>
          <div class="form-group col-md-4 pull-right">
              <button class="btn btn-success" type="submit"> Create Notable </button>
          </div>
        </form>
    </div>
    <div id="notable-table" class="" v-if="this.notables.length">
      <table class="table table-bordered">
        <thead class="thead-dark">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Content</th>
          <th scope="col">Author</th>
          <th scope="col">Edit / Delete</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="notable in this.notables" v-bind:key="notable.id">
          <td>{{ notable.title }}</td>
          <td>{{ notable.content }}</td>
          <td>{{ notable.author }}</td>
          <td>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group" style="margin-bottom: 20px;">
                <router-link :to="{name: 'Edit Notable', params: {id: notable.id}}" class="btn btn-sm btn-outline-secondary">Edit Notable</router-link>
                <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteNotable(notable.id)">Delete Notable</button>
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
  import axios from "axios";
  import { server } from "@/helper";
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
        notables: [],
        notable: {
          title: '',
          content: '',
          author: '',
        }
      };
    },
    mounted() {
      this.getAllNotables();
    },
    methods: {
      validateData() {
        this.createNotable();
      },
      createNotable() {
        const notableData = {
          title: this.notable.title,
          content: this.notable.content,
          author: this.notable.author
        };
        this.__submitToServer(notableData);
      },
      __submitToServer(data) {
        axios.post(`${server.baseURL}/api/notables/create`, data, config).then(data => {
          this.notables.splice(0,0, data.data);
          this.clearForm();
        });
      },
      async getAllNotables() {
        await axios.post(`${server.baseURL}/api/notables/fetchAll`, {}, config).then(data => {
          this.notables = data.data;
        });
        if (this.notables) {
          this.selectRandomNotable();
        }
      },
      selectRandomNotable() {
        const random = Math.floor(Math.random() * this.notables.length);
        const pick = this.notables[random];

        this.$notify({
          title: pick.title,
          text: pick.content + ' - ' + pick.author,
          duration: -1
        });
      },
      deleteNotable(id) {
        axios
            .delete(`${server.baseURL}/api/notables/`+id, config)
            .then(data => {
              console.log(data);
              window.location.reload();
            });
      },
      clearForm() {
        this.notable = {
            title: '',
            content: '',
            author: '',
        }
      }
    }
  };
</script>
