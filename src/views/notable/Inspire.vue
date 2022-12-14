<template>
  <div class="container mt-5" v-if="this.notable">
    <div class="card px-0 col-md-12">
      <div id="quote" class="row g-0">
        <div class="col-md-2">
          <img src="/assets/img/logo-color.svg" class="img-fluid" alt="Logo">
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
    <div class="col-md-12 mt-5 d-flex justify-content-start">
      <button type="button" class="btn btn-success btn-lg mr-2" @click="selectRandomNotable()">Shuffle</button>
      <button type="button" class="btn btn-primary btn-lg" @click="createImageFromQuote()">Make Image</button>
    </div>
    <div id="quote-to-share" class="row g-0" ></div>
  </div>
  <div class="container mt-5" v-else>
    <div class="row d-flex">
      <div class="col-md-4 mb-3">
        <img src="/assets/img/logo-color.svg" class="img-fluid rounded-start" alt="Logo">
      </div>
      <div class="col-md-8 d-flex align-items-center">
        <blockquote>
          <p class="mb-2 text-center">You do not have any notables yet but you can add one!</p>
          <router-link :to="{name: 'Notables'}" class="btn btn-sm btn-success d-block">
            Create
          </router-link>
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "@/helper";
import store from "@/store";
import * as htmlToImage from 'html-to-image';

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
    },
    createImageFromQuote() {
      const target = document.getElementById('quote-to-share');
      htmlToImage.toPng(document.getElementById('quote'))
          .then(function (dataUrl) {
            target.innerHTML = "<img src='"+ dataUrl +"' class='img-fluid mt-5'>";
          })
          .catch(function (error) {
            console.error('oops, something went wrong!', error);
          });
    }
  }
};
</script>