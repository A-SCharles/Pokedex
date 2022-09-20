import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    allPokemon: null,
    Pokemon: null,
  },
  getters: {},
  mutations: {
    SetAllPokemon: (state, allPokemon) => {
      state.allPokemon = allPokemon
      console.log(allPokemon);
    },
    SetPokemon: (state, Pokemon) => {
      state.Pokemon = Pokemon
    },
  },
  actions: {
    getAllPokemon: async (context) => {
      let pokemon = []
      await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')
        .then((res) => res.json())
        .then((all) => {
          // console.log(data.results);
          // context.commit('SetAllPokemon' , data.results)
          for (let i = 0; i < all.results.length; i++) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${all.results[i].name}`)
              .then((res) => res.json())
              .then((data) => {
                pokemon.push(data)
                if (i === all.results.length -1) {
                  context.commit('SetAllPokemon', pokemon)
                }
              })
          }
        })
    },
  },
  modules: {}
})