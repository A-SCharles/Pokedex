<template>
  <div class="container" v-if="allPokemon">
    <div class="row">
      <div v-for="pokemon in allPokemon" :key="pokemon" class="card m-3 mx-auto">
        <img class="img-fluid mx-auto" :src="pokemon.sprites.front_default" alt="" />
        <p>{{pokemon.name}}</p>
        <div class="row">
          <h5>Base Stats:</h5>
          <p class="col-md-6 text-start" v-for="stat in pokemon.stats" :key="stat">
            {{stat.stat.name}}:
            <span>
              {{stat.base_stat}}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    allPokemon() {
      return this.$store.state.allPokemon;
    },
  },
  // 
  mounted() {
    this.$store.dispatch("getAllPokemon");
  },
};
</script>

<style>
  .card {
    width: 300px;
  }

  .img-fluid {
    height: 100%;
    width: 200px;
    object-fit: cover;
  }
</style>
