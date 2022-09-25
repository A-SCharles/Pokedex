<template>
  <div class="container">
    <div class="row">
      <button
        @click="this.$store.dispatch('getAllPokemon')"
        class="btn col-md-3"
      >
        All
      </button>
      <button
        @click="this.$store.dispatch('getRegion', 2)"
        class="btn col-md-3"
      >
        Kanto
      </button>
      <button
        @click="this.$store.dispatch('getRegion', 4)"
        class="btn col-md-3"
      >
        Hoenn
      </button>
      <button
        @click="this.$store.dispatch('getRegion', 6)"
        class="btn col-md-3"
      >
        Sinnoh
      </button>
      <button
        @click="this.$store.dispatch('getLegendaries')"
        class="btn col-md-3"
      >
        Legendaries
      </button>

      <button
        @click="this.$store.dispatch('getMythicals')"
        class="btn col-md-3"
      >
        Mythicals
      </button>

      <button
        @click="this.$store.dispatch('getRegion', 3)"
        class="btn col-md-3"
      >
        Johto
      </button>

      <input
        class="form-control mx-auto w-50"
        type="text"
        v-model="search"
        placeholder="Search Pokemon by name"
      />
    </div>
    <div class="row" v-if="allPokemon">
      <div
        v-for="pokemon in allPokemon"
        :key="pokemon"
        class="card rounded-circle m-3 mx-auto"
      >
        <router-link :to="{ name: 'single', params: { id: pokemon.id } }">
          <img
            v-if="pokemon.sprites.front_default"
            class="img-fluid mx-auto"
            :src="pokemon.sprites.front_default"
            alt=""
          />
          <img
            v-else-if="pokemon.sprites.other['official-artwork'].front_default"
            class="img-fluid mx-auto"
            :src="pokemon.sprites.other['official-artwork'].front_default"
            :alt="pokemon.sprites.other['official-artwork'].front_default"
          />
          <img
            v-else-if="pokemon.sprites.other['home'].front_default"
            class="img-fluid mx-auto"
            :src="pokemon.sprites.other['home'].front_default"
            :alt="pokemon.sprites.other['home'].front_default"
          />
          <img
            v-else-if="pokemon.sprites.front_shiny"
            class="img-fluid mx-auto"
            :src="pokemon.sprites.front_shiny"
            :alt="pokemon.sprites.front_shiny"
          />
          <!-- <p>id : #{{ pokemon.id }}</p> -->
          <p class="nav-item">{{ pokemon.name }}</p>
        </router-link>
      </div>
    </div>
    <div class="container vh-100" v-else>
      <Loader />
    </div>
  </div>
</template>

<script>
import Loader from "@/components/loader.vue";
export default {
  components: { Loader },
  data() {
    return {
      search: "",
    };
  },
  computed: {
    // allPokemon() {
    //   return this.$store.state.allPokemon;
    // },
    allPokemon() {
      return this.$store.state.allPokemon?.filter((pokemon) => {
        let isMatch = true;
        if (!pokemon.name.toLowerCase().includes(this.search)) {
          isMatch = false;
        }
        return isMatch;
      });
    },
  },
  mounted() {
    // this.$store.dispatch("getAllPokemon");
    this.$store.state.pokemon = null;
  },
};
</script>

<style scoped>
.card {
  width: 250px;
  height: fit-content;
}

.img-fluid {
  height: 100%;
  width: 200px;
  object-fit: cover;
}
</style>
