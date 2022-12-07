<template>
  <div id="nav" class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">GEST</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-for="route in this.routes">
            <router-link class="nav-link" :to="{path: route.path}">
              {{ route.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <router-view/>
</template>

<script>
  import router from "../src/router";

  export default {
    data() {
      return {
        routes: []
      };
    },
    mounted() {
      let routes = router.getRoutes();
      routes.shift();
      this.routes = routes;
    },
    methods: {}
  };
</script>
