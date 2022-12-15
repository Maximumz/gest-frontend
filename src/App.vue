<template>
  <div id="nav" class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img src="/assets/img/logo-no-background.svg" alt="" width="75" height="50">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-for="route in this.routes">
            <router-link class="nav-link" :to="{path: route.path}" v-on:click="toggleNavBar()">
              {{ route.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <router-view/>
  <!-- Footer -->
  <footer class="text-center text-lg-start bg-dark text-muted mt-5">
    <!-- Copyright -->
    <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
      © 2022 Copyright:
      <a class="text-reset fw-bold" href="https://mp-ltd.com/">Maximized Potential Ltd</a>
    </div>
    <!-- Copyright -->
  </footer>
  <!-- Footer -->
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
      this.routes = this.removeValues(routes);
    },
    methods: {
      removeValues(routes) {
        for (let i = 0; i < routes.length; i++) {
          let obj = routes[i];
          if (['/', '/edit-notable/:id', '/edit-user/:id'].indexOf(obj.path) !== -1) {
            routes.splice(i, 1);
            i--;
          }
        }
        return routes;
      },
      toggleNavBar() {
        let element = document.getElementsByClassName( 'navbar-toggler' )[ 0 ];
        if (element.getAttribute( 'aria-expanded' ) === 'true' ) {
          element.click();
        }
      }
    }
  };
</script>
