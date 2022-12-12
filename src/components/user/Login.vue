<template>
  <div class="container mt-5">
    <div class="col-md-12 form-wrapper">
        <h2> Login  </h2>
        <form id="login-post-form" @submit.prevent="validateData">
          <div class="form-group col-md-12">
            <label for="title"> Username </label>
            <input type="text" id="username" v-model="username" name="title" class="form-control" placeholder="Enter Username (Your username)">
          </div>
          <div class="form-group col-md-12">
              <label for="title"> Password </label>
              <input type="password" id="password" v-model="password" name="title" class="form-control" placeholder="Enter your Password">
          </div>
          <div class="form-group col-md-4 pull-right">
              <button class="btn btn-success" type="submit"> Login </button>
          </div>
        </form>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { server } from "@/helper";
  import router from "../../router";
  import store from '../../store/index';
  export default {
    data() {
      return {
        username: "",
        password: ""
      };
    },
    methods: {
      validateData() {

        const regexUsername = /^[a-zA-Z0-9-_]+$/;
        const regexPass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        let validated = false;

        if (this.username.search(regexUsername) === -1) {
          alert('invalid username');
        } else if (this.password.search(regexPass) === -1) {
          alert('invalid password');
        } else {
          validated = true;
        }

        if (validated) {
          this.loginUser();
        } else {
          return false;
        }
      },
      loginUser() {
        const params = new URLSearchParams();
        params.append('username', this.username);
        params.append('password',  this.password);
        this.__submitToServer(params);
      },
      async __submitToServer(data) {
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        await axios.post(`${server.baseURL}/preauth/login`, data, config)
          .then((response) => {
            if (response.status === 201) {
              store.commit('setUser', response.data)
              router.go(0);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };
</script>
