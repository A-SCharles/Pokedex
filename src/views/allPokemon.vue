<template>
  <div class="container" v-if="allPokemon">
    <div class="row">
      <button class="btn col-md-3">All</button>
      <button class="btn col-md-3">Kanto</button>
      <button class="btn col-md-3">Hoenn</button>
      <button class="btn col-md-3">Sinnoh</button>
    </div>
    <div class="row">
      <!-- <div
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
      </div> -->
      <div
        v-for="pokemon in allPokemon"
        :key="pokemon"
        class="card rounded-circle m-3 mx-auto"
      >
        <router-link :to="{ name: 'single', params: { id: pokemon.id } }">
          <img
            class="img-fluid mx-auto"
            :src="pokemon.sprites.front_default"
            alt=""
          />
          <!-- <p>id : #{{ pokemon.id }}</p> -->
          <p class="nav-item">{{ pokemon.name }}</p>
        </router-link>
      </div>
    </div>
  </div>
  <div class="container vh-100" v-else>
    <Loader />
  </div>
</template>

<script>
import Loader from "@/components/loader.vue";
export default {
  computed: {
    allPokemon() {
      return this.$store.state.allPokemon;
    },
  },
  mounted() {
    this.$store.dispatch("getAllPokemon");
    this.$store.state.pokemon = null;
  },
  components: { Loader },
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
