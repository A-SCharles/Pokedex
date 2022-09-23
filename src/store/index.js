import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    allPokemon: null,
    pokemon: null,
  },
  getters: {},
  mutations: {
    SetAllPokemon: (state, allPokemon) => {
      state.allPokemon = allPokemon
      // console.log(allPokemon[0]);
    },
    SetPokemon: (state, pokemon) => {
      state.pokemon = pokemon
      // console.log(Pokemon[1].chain.evolves_to[0].species.name);
      console.log(pokemon);
    },
  },
  actions: {
    getAllPokemon: async (context) => {
      let pokemon = []
      let res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0')
      let all = await res.json()
      // console.log(all.results);

      for (let i = 0; i < all.results.length; i++) {
        let details = await fetch(`https://pokeapi.co/api/v2/pokemon/${all.results[i].name}`)
        let data = await details.json()
        pokemon.push(data)
        if (i === all.results.length - 1) {
          // console.log(pokemon);
          context.commit('SetAllPokemon', pokemon)
        }
      }
    },
    getDetails: async (context, pokemon) => {
      // console.log(pokemon);

      let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
      let data = await res.json()
      console.log(data);

      let evo = await fetch(data.species.url)
      let final = await evo.json()
      console.log(final);
      let evolvesfrom = null

      if (final.evolves_from_species != null) {
        evolvesfrom = final.evolves_from_species.name
      }

      if (final.evolution_chain != null) {
        var ch = await fetch(final.evolution_chain.url)
        var cahin = await ch.json()
        console.log(cahin);
        var evolvesto = null

        if ((cahin.chain.evolves_to[0].species.name != evolvesfrom)) {
          evolvesto = cahin.chain.evolves_to[0].species.name
        }
        // console.log(cahin.chain.evolves_to[0]);

        if ((cahin.chain.evolves_to[0].species.name === data.name)) {
          if (cahin.chain.evolves_to[0].evolves_to[0] === undefined) {
            evolvesto = null
          } else {

            evolvesto = cahin.chain.evolves_to[0].evolves_to[0].species.name
          }
        }
      }


      context.commit('SetPokemon', {
        data,
        evolvesfrom,
        evolvesto
      })
    },

    getRegion : async (context) => {
      let res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0')
      let all = await res.json()
      // console.log(all.results);
    }

  },
  modules: {}
})