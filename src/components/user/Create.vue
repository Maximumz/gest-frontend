<template>
  <div class="container mt-5">
    <div class="col-md-12 form-wrapper">
        <h2> Create Account </h2>
        <form id="create-post-form" @submit.prevent="validateData">
          <div class="form-group col-md-12">
            <label for="title"> Username </label>
            <input type="text" id="username" v-model="username" name="title" class="form-control" placeholder="Enter Username (MightyScribe)">
          </div>
          <div class="form-group col-md-12">
            <label for="title"> Name </label>
            <input type="text" id="name" v-model="name" name="title" class="form-control" placeholder="Enter your Name">
          </div>
          <div class="form-group col-md-12">
            <label for="title"> Email </label>
            <input type="text" id="email" v-model="email" name="title" class="form-control" placeholder="Enter your Email">
          </div>
          <div class="form-group col-md-12">
            <label for="title"> Confirm Email </label>
            <input type="text" id="confirmEmail" v-model="confirmEmail" name="title" class="form-control" placeholder="Enter your Email again to confirm">
          </div>
          <div class="form-group col-md-12">
              <label for="title"> Password </label>
              <input type="password" id="password" v-model="password" name="title" class="form-control" placeholder="Enter your Password">
          </div>
          <div class="form-group col-md-12">
              <label for="title"> Confirm Password </label>
              <input type="password" id="confirmPassword" v-model="confirmPassword" name="title" class="form-control" placeholder="Enter your Password again to confirm">
          </div>
          <div class="form-group col-md-4 pull-right">
              <button class="btn btn-success" type="submit"> Create Account </button>
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
        username: "",
        name: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: ""
      };
    },
    methods: {
      validateData() {
        const regexUsername = /^[a-zA-Z0-9-_]+$/;
        const regexName = /^(([A-Za-z]+[-']?)*([A-Za-z]+)?\s)+([A-Za-z]+[-']?)*([A-Za-z]+)?$/;
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regexPass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        let validated = false;

        if (this.username.search(regexUsername) === -1) {
          alert('invalid username');
        } else if (this.name.search(regexName) === -1) {
          alert('invalid name');
        } else if (this.email.search(regexEmail) === -1) {
          alert('invalid email');
        } else if (this.email !== this.confirmEmail) {
          alert('Emails do not match');
        } else if (this.password.search(regexPass) === -1) {
          alert('invalid password');
        } else if (this.password !== this.confirmPassword) {
          alert('Passwords do not match');
        } else {
          validated = true;
        }

        if (validated) {
          this.createUser();
        } else {
          return false;
        }
      },
      createUser() {
        let customerData = {
          name: this.name,
          email: this.email,
          username: this.username,
          passhash: this.password
        };
        this.__submitToServer(customerData);
      },
      __submitToServer(data) {
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(`${server.baseURL}/preauth/create`, data, config)
          .then((response) => {
            console.log(response);
            if (response) {
              router.push({ name: "Home" });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };
</script>
