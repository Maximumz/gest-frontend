<template>
  <div class="container">
    <div class="col-md-12 text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
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
      return {};
    },
    async mounted() {
      console.log('fired');
      await this.logoutUser();
    },
    methods: {
      logoutUser() {
        const params = new URLSearchParams();
        params.append('user', store.getters.StateUser.user);
        this.__submitToServer(params);
      },
      async __submitToServer(data) {
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        await axios.post(`${server.baseURL}/auth/logout`, data, config)
          .then((response) => {
            if (response.status === 201) {
              store.commit('logout');
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
