<template>
  <footer id="footer" class="p-3">
    <div class="container-fluid">
      <div class="row">
        <div class="d-flex justify-content-between text-black-50">
          <p>
            Created by
            <span v-for="creator in creators" :key="creator"
              >{{ creator.name }},
            </span>
          </p>
        <!-- </div>

        <div> -->
          <p>&copy;Copyright {{ year }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    year() {
      let date = new Date().getFullYear();
      return date;
    },
    creators() {
      return this.$store.state.creators;
    },
  },
};
</script>

<style scoped>
#footer {
  min-height: 10vh;
}
</style>
