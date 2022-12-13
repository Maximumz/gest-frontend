<template>
  <div class="container mt-5">
    <div class="card px-0 col-md-12" v-if="this.notable">
      <div class="row g-0">
        <div class="col-md-2">
          <img src="/assets/img/logo-color.svg" class="img-fluid rounded-start" alt="Logo">
        </div>
        <div class="col-md-10">
          <div class="card-header">{{ this.notable.title }}</div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p>{{ this.notable.content }}</p>
              <footer class="blockquote-footer">
                <cite title="Source Title">{{ this.notable.author }}</cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12 mt-5">
      <button type="button" class="btn btn-success btn-lg" @click="selectRandomNotable()">Shuffle</button>
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
    async getAllNotables() {
      await axios.post(`${server.baseURL}/api/notables/fetchAll`, {}, config).then(data => {
        this.notables = data.data;
        this.selectRandomNotable();
      });
    },
    selectRandomNotable() {
      const random = Math.floor(Math.random() * this.notables.length);
      this.notable = this.notables[random];
    }
  }
};
</script>