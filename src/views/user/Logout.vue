<template>
  <div class="container">
    <div class="col-md-12 text-center d-flex justify-content-center align-items-center" style="height: 100vh;">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { server } from "@/helper";
  import router from "@/router";
  import store from '@/store';
  export default {
    data() {
      return {};
    },
    async mounted() {
      await this.logoutUser();
    },
    methods: {
      logoutUser() {
        const user = typeof store.getters.StateUser.user != null ? store.getters.StateUser.user : null;
        if (!user) {
          router.go(0);
        }
        const params = new URLSearchParams();
        params.append('user', JSON.stringify(user));
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
              localStorage.removeItem('vuex');
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
