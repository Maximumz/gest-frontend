<template>
  <div>
    <div class="col-md-12 form-wrapper">
        <h2> Create Notable </h2>
        <form id="create-post-form" @submit.prevent="validateData">
          <div class="form-group col-md-12">
            <label for="title"> Title </label>
            <input type="text" id="title" v-model="title" name="title" class="form-control" placeholder="Enter your Title">
          </div>
          <div class="form-group col-md-12">
            <label for="title"> Content </label>
            <input type="text-area" id="content" v-model="content" name="title" class="form-control" placeholder="Enter your inspirational thought">
          </div>
          <div class="form-group col-md-12">
            <label for="title"> Author </label>
            <input type="text" id="author" v-model="author" name="title" class="form-control" placeholder="Enter your name or another author">
          </div>
          <div class="form-group col-md-4 pull-right">
              <button class="btn btn-success" type="submit"> Create Notable </button>
          </div>
        </form>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { server } from "@/helper";
  import router from "../../router";
  export default {
    data() {
      return {
        title: "",
        content: "",
        author: ""
      };
    },
    methods: {
      validateData() {
        createNotable();
      },
      createNotable() {
        let notableData = {
          title: this.title,
          content: this.content,
          author: this.author
        };
        this.__submitToServer(notableData);
      },
      __submitToServer(data) {
        axios.post(`${server.baseURL}/api/notables`, data).then(data => {
          router.push({ name: "/" });
        });
      }
    }
  };
</script>
