<template>
  <div class="container" v-if="allPokemon">
    <div class="row">
      <div
        v-for="pokemon in allPokemon"
        :key="pokemon"
        class="card m-3 mx-auto"
      >
      <router-link :to="{name : 'single', params : {id: pokemon.id}}"> click here </router-link>
        <img
          class="img-fluid mx-auto"
          :src="pokemon.sprites.front_default"
          alt=""
        />
        <p>id : #{{ pokemon.id }}</p>
        <p>{{ pokemon.name }}</p>
        <div class="row">
          <h5>Base Stats:</h5>
          <p
            class="col-md-6 text-start"
            v-for="stat in pokemon.stats"
            :key="stat"
          >
            {{ stat.stat.name }}:
            <span>
              {{ stat.base_stat }}
            </span>
          </p>
        </div>
        <div class="row">
          <h5>Type :</h5>
          <p
            v-for="ptype in pokemon.types"
            :key="ptype"
            class="col mx-3 rounded-pill bg-info"
          >
            {{ ptype.type.name }}
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
  mounted() {
    this.$store.dispatch("getAllPokemon");
    this.$store.state.pokemon = null
  },
};
</script>

<style scoped>
.card {
  width: 300px;
}

.img-fluid {
  height: 100%;
  width: 200px;
  object-fit: cover;
}
</style>
