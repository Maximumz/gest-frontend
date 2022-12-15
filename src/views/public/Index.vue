<template>
    <div class="container mt-5 mb-5">
      <div class="row">
        <div class="col-md-12">
          <div class="text-center">
            <h1>Welcome to GEST</h1>
            <img class="img-fluid mt-5" src="/assets/img/logo-color.svg" alt="GEST logo" style="max-width: 300px;">
          </div>
        </div>
        <div class="col-md-12 text-center mt-5 mb-5">
          <h4>What is GEST?</h4>
          <div class="row">
            <div class="col-md-12">
              <figure class="text-center">
                <p>Gest - A Notable Deed Or Exploit</p>
                <figcaption class="blockquote-footer">
                  <cite title="Source Title">Collins English Dictionary. Copyright © HarperCollins Publishers</cite>
                </figcaption>
              </figure>
              <h5>GEST is a platform to store notable inspirational thoughts/quotes & a place to be inspired</h5>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-md-4 mb-5">
              <h5>CREATE</h5>
              <BootstrapIcon
                  icon="chat-quote"
                  variant="success"
                  size="3x" />
              <p>Enter a title, the content (a quote) & the author</p>
              <button v-on:click="this.$router.push({path: '/create-notable'})" class="btn btn-success">CREATE HERE</button>
            </div>
            <div class="col-md-4 mb-5">
              <h5>BE INSPIRED</h5>
              <BootstrapIcon
                  icon="geo"
                  variant="success"
                  size="3x" />
              <p>Once content is added be inspired</p>
              <button v-on:click="this.$router.push({path: '/inspire'})" class="btn btn-success">INSPIRED HERE</button>
            </div>
            <div class="col-md-4 mb-5">
              <h5>SHARE</h5>
              <BootstrapIcon
                  icon="share"
                  variant="success"
                  size="3x" />
              <p>Save the quote as an image (copy/paste)</p>
              <button v-on:click="this.$router.push({path: '/inspire'})" class="btn btn-success">SHARE HERE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>

export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
