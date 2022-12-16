<template>
  <div class="container mt-5" v-if="this.notable">
    <div class="card px-0 col-md-12">
      <div id="quote" class="row g-0 bg-white">
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
    <div class="row">
      <div class="col-md-12 mt-5 d-flex justify-content-start">
        <button type="button" class="btn btn-success btn-lg mr-2" @click="selectRandomNotable()">Shuffle Notables</button>
      </div>
    </div>
    <div class="row" v-if="this.filterTitleKeys">
      <div class="col-md-12 mt-4">
        <p>Filter by matching titles:</p>
        <h4>
          <span v-for="filter in this.filterTitleKeys" class="badge bg-warning text-dark me-2 text-capitalize" v-on:click="addFilter('title', filter)">{{ filter }}</span>
        </h4>
      </div>
      <div class="col-md-12" v-if="this.filterTitleKeysApplied">
        <p>Filters applied:</p>
        <h4>
          <span v-for="filtered in this.filterTitleKeysApplied" class="badge bg-secondary me-2 text-capitalize" v-on:click="removeFilter('title', filtered)">{{ filtered }}</span>
        </h4>
      </div>
    </div>
    <div class="row" v-if="this.filterAuthorKeys">
      <div class="col-md-12 mt-4">
        <p>Filter by matching authors:</p>
        <h4>
          <span v-for="filter in this.filterAuthorKeys" class="badge bg-warning text-dark me-2 text-capitalize" v-on:click="addFilter('author', filter)">{{ filter }}</span>
        </h4>
      </div>
      <div class="col-md-12" v-if="this.filterAuthorKeysApplied">
        <p>Filters applied:</p>
        <h4>
          <span v-for="filtered in this.filterAuthorKeysApplied" class="badge bg-secondary me-2 text-capitalize" v-on:click="removeFilter('author', filtered)">{{ filtered }}</span>
        </h4>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 mt-4">
        <button type="button" class="btn btn-primary btn-lg" @click="createImageFromQuote()">Make Image</button>
        <div id="quote-to-share" class="row g-0" ></div>
      </div>
    </div>
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

const accessToken = store.getters.isAuthenticated ? store.getters.StateUser.access_token : null;

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
      filteredNotables: [],
      filterTitleKeys: [],
      filterAuthorKeys: [],
      filterTitleKeysApplied: [],
      filterAuthorKeysApplied: [],
      notable: {
        title: '',
        content: '',
        author: '',
      }
    };
  },
  async mounted() {
    await this.getAllNotables();
    this.getAllMatchingKeysToFilter();
  },
  methods: {
    async getAllNotables() {
      await axios.post(`${server.baseURL}/api/notables/fetchAll`, {}, config).then(data => {
        this.notables = data.data;
        this.selectRandomNotable();
      });
    },
    selectRandomNotable() {
      let notables = this.notables;
      if (this.filteredNotables.length) {
        notables = this.filteredNotables;
      }
      const random = Math.floor(Math.random() * notables.length);
      this.notable = notables[random];
    },
    createImageFromQuote() {
      const target = document.getElementById('quote-to-share');
      htmlToImage.toJpeg(document.getElementById('quote'))
          .then(function (dataUrl) {
            target.innerHTML = "<img src='"+ dataUrl +"' class='img-fluid mt-5'>";
          })
          .catch(function (error) {
            console.error('oops, something went wrong!', error);
          });
    },
    filterNotables() {
      this.filteredNotables = [];
       const filteredByTitle = this.notables.filter(notable => {
        let match = false;
        if (this.filterTitleKeysApplied.includes(notable.title.trim().toLowerCase())) {
          match = true;
        }
        return match
      });
      const filteredByAuthor = this.notables.filter(notable => {
        let match = false;
        if (this.filterAuthorKeysApplied.includes(notable.author.trim().toLowerCase())) {
          match = true;
        }
        return match
      });
      this.filteredNotables = this.filteredNotables.concat(filteredByTitle, filteredByAuthor)
      this.selectRandomNotable();
    },
    removeFilter(type, filter) {
      if (type === 'title') {
        this.filterTitleKeys.push(filter);
        let index = this.filterTitleKeysApplied.indexOf(filter);
        if (index !== null) {
          this.filterTitleKeysApplied.splice(index, 1);
          this.filterNotables();
        }
      } else if(type === 'author') {
        this.filterAuthorKeys.push(filter);
        const index = this.filterAuthorKeysApplied.indexOf(filter);
        if (index !== null) {
          this.filterAuthorKeysApplied.splice(index, 1);
          this.filterNotables();
        }
      }
    },
    addFilter(type, filter) {
      if (type === 'title') {
        this.filterTitleKeysApplied.push(filter);
        let index = this.filterTitleKeys.indexOf(filter);
        if (index !== null) {
          this.filterTitleKeys.splice(index, 1);
        }
        this.filterNotables();
      } else if(type === 'author') {
        this.filterAuthorKeysApplied.push(filter);
        let index = this.filterAuthorKeys.indexOf(filter);
        if (index !== null) {
          this.filterAuthorKeys.splice(index, 1);
        }
        this.filterNotables();
      }
    },
    getAllMatchingKeysToFilter() {
      this.filterTitleKeys = [];
      this.filterAuthorKeys = [];

      const titles = this.notables.map(a => a.title.trim().toLowerCase());
      const authors = this.notables.map(a => a.author.trim().toLowerCase());

      const filteredTitles = titles.filter((v, i) => titles.indexOf(v) !== i);
      const uniqueTitles = new Set(filteredTitles);

      const filteredAuthors = authors.filter((v, i) => authors.indexOf(v) !== i);
      const uniqueAuthors = new Set(filteredAuthors);

      this.filterTitleKeys = Array.from(uniqueTitles);
      this.filterAuthorKeys = Array.from(uniqueAuthors);
    }
  }
};
</script>