<template>
  <section id="pokemon">
    <div class="container p-2">
      <div v-if="pokemon" class="row">
        <div class="card">
          <div class="row p-5">
            <div class="col-md-8">
              <img
                v-if="
                  pokemon.data.sprites.other['official-artwork'].front_default
                "
                class="img-fluid"
                :src="
                  pokemon.data.sprites.other['official-artwork'].front_default
                "
                :alt="
                  pokemon.data.sprites.other['official-artwork'].front_default
                "
              />
              <img
                v-else-if="pokemon.data.sprites.other['home'].front_default"
                class="img-fluid"
                :src="pokemon.data.sprites.other['home'].front_default"
                :alt="pokemon.data.sprites.other['home'].front_default"
              />
              <img
                v-else-if="pokemon.data.sprites.front_shiny"
                class="img-fluid"
                :src="pokemon.data.sprites.front_shiny"
                :alt="pokemon.data.sprites.front_shiny"
              />
              <h2>{{ pokemon.data.name }}</h2>
              <a :href="pokemon.data.species.url">URL</a>
              <p>{{ pokemon.data.bar.flavor_text_entries[0].flavor_text }}</p>
              <h2>#{{ pokemon.data.id }}</h2>
            </div>

            <div class="col-md-4">
              <!-- stats -->
              <div class="row my-3 py-3 shadow rounded-5 stats">
                <h3>Stats :</h3>
                <div
                  class="col-md-6"
                  v-for="stat in pokemon.data.stats"
                  :key="stat"
                >
                  <div class="progress">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      :aria-label="stat.stat.name"
                      :style="'width:' + stat.base_stat + '%'"
                      :aria-valuenow="stat.base_stat"
                      aria-valuemin="0"
                      aria-valuemax="1000"
                    ></div>
                  </div>
                  <p>
                    {{ stat.stat.name }}: <span>{{ stat.base_stat }}</span>
                  </p>
                </div>
              </div>

              <!-- types -->
              <div class="row my-3 py-3 shadow rounded-5">
                <h3>Type :</h3>
                <p
                  class="col-md-6 mx-auto"
                  v-for="ptype in pokemon.data.types"
                  :key="ptype"
                >
                  {{ ptype.type.name }}
                </p>
              </div>

              <!-- abilities -->
              <div class="row my-3 py-3 shadow rounded-5">
                <h3>Ability :</h3>
                <button
                  class="btn col-md-6 mx-auto"
                  v-for="ability in pokemon.data.abilities"
                  :key="ability"
                  data-bs-toggle="modal"
                  :data-bs-target="'#effect' + ability.ability.name"
                  @click="this.$store.dispatch('getAbility', ability)"
                >
                  {{ ability.ability.name }}
                </button>
              </div>

              <!-- Evolution -->
              <div
                class="row my-3 py-3 shadow rounded-5"
                v-if="pokemon.evolvesfrom || pokemon.evolvesto"
              >
                <h3>Evolution :</h3>
                <div class="col-md-6" v-if="pokemon.evolvesfrom">
                  <p>Evolves From :</p>
                  <p class="btn" @click="to(pokemon.evolvesfrom)">
                    {{ pokemon.evolvesfrom }}
                  </p>
                </div>

                <div class="col-md-6" v-if="pokemon.evolvesto">
                  <p>Evolves To :</p>
                  <p class="btn" @click="to(pokemon.evolvesto)">
                    {{ pokemon.evolvesto }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- varieties -->
          <div class="row" v-if="pokemon.data.bar.varieties.length > 1">
            <h3>Varieties</h3>

            <div
              @click="to(pokemon.pokemon.name)"
              class="card m-3 btn mx-auto"
              v-for="(pokemon, index) in pokemon.data.bar.varieties"
              :key="index"
            >
              <img
                class="my-auto"
                :src="pokemon.pokemon.sprites.front_default"
                :alt="pokemon.pokemon.sprites.front_default"
              />
              <p class="my-auto">{{ pokemon.pokemon.name }}</p>
            </div>
          </div>

          <div class="m-5 d-flex justify-content-between">
            <button
              v-if="pokemon.data.id > 1"
              @click="previous"
              class="btn btn-warning"
            >
              Previous
            </button>

            <button
              v-if="pokemon.data.id <= 10248"
              @click="next"
              class="btn btn-warning"
            >
              Next
            </button>
          </div>
        </div>
        <!-- modals -->
        <Effect
          v-for="ability in pokemon.data.abilities"
          :key="ability"
          :ability="ability"
        />
      </div>
      <div v-else>
        <Loader />
      </div>
    </div>
  </section>
</template>

<script>
import Loader from "@/components/loader.vue";
import router from "@/router";
import Effect from "@/components/effect.vue";
export default {
  props: ["id"],
  computed: {
    pokemon() {
      return this.$store.state.pokemon;
    },
  },
  mounted() {
    this.$store.dispatch("getDetails", this.id);
  },
  methods: {
    next() {
      this.$store.state.pokemon = null;
      this.$store.dispatch("getDetails", parseInt(this.id) + 1);
      router.push({ name: "single", params: { id: parseInt(this.id) + 1 } });
    },
    previous() {
      this.$store.state.pokemon = null;
      this.$store.dispatch("getDetails", parseInt(this.id) - 1);
      router.push({ name: "single", params: { id: parseInt(this.id) - 1 } });
    },
    async to(pokemon) {
      this.$store.state.pokemon = null;
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
      let data = await res.json();

      this.$store.dispatch("getDetails", parseInt(data.id));
      router.push({ name: "single", params: { id: parseInt(data.id) } });
    },
  },
  components: { Loader, Effect },
};
</script>

<style scoped>
#pokemon {
  min-height: 100vh;
}
.card {
  min-height: fit-content;
  width: fit-content;
}

.stats .col-md-6:nth-child(2) .progress-bar {
  background-color: green;
}

.stats .progress-bar {
  background-color: blue;
}
/* 
.stats .col-md-6:nth-child(3) .progress-bar{
  background-color: blue;
}
.stats .col-md-6:nth-child(4) .progress-bar{
  background-color: aqua;
}

.stats .col-md-6:nth-child(5) .progress-bar{
  background-color: aqua;
}

.stats .col-md-6:nth-child(6) .progress-bar{
  background-color: aqua;
}

.stats .col-md-6:nth-child(7) .progress-bar{
  background-color: aqua;
} */
</style>
