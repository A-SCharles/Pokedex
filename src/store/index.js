import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    allPokemon: null,
    pokemon: null,
    ability: null,
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
    SetAbility: (state, ability) => {
      state.ability = ability
      // console.log(ability);
    }
  },
  actions: {
    getAllPokemon: async (context) => {
      let pokemon = []
      let res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1158&offset=0')
      let all = await res.json()
      // console.log(all.results);

      for (let i = 0; i < all.results.length; i++) {
        let details = await fetch(`https://pokeapi.co/api/v2/pokemon/${all.results[i].name}`)
        let data = await details.json()
        pokemon.push(data)
        if (i === all.results.length - 1) {
          console.log(pokemon[0]);
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
        // console.log(cahin.chain.evolves_to);
        var evolvesto = null

        if (cahin.chain.evolves_to.length != 0) {
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
      }

      for (let i = 0; i < final.flavor_text_entries.length; i++) {
        if (final.flavor_text_entries[i].language.name === 'en') {
          final.flavor_text_entries[0].flavor_text = final.flavor_text_entries[i].flavor_text
          // console.log(final.flavor_text_entries[0].flavor_text);
        }
      }

      data.bar = final

      context.commit('SetPokemon', {
        data,
        evolvesfrom,
        evolvesto
      })
    },

    getRegion: async (context, region) => {
      // console.log(region);
      let pokemon = []
      let res = await fetch(`https://pokeapi.co/api/v2/pokedex/${region}`)
      let all = await res.json()
      console.log(all);
      let leng = all.pokemon_entries.length

      for (let i = 0; i < leng; i++) {
        if (all.pokemon_entries[i].pokemon_species.name === 'deoxys') {
          // console.log(all.pokemon_entries[i]);
          all.pokemon_entries[i].pokemon_species.name = 386
        }
        if (all.pokemon_entries[i].pokemon_species.name === 'wormadam') {
          // console.log(all.pokemon_entries[i]);
          all.pokemon_entries[i].pokemon_species.name = 'wormadam-plant'
        }
        if (all.pokemon_entries[i].pokemon_species.name === 'giratina') {
          // console.log(all.pokemon_entries[i]);
          all.pokemon_entries[i].pokemon_species.name = 'giratina-altered'
        }
        // console.log(i);
        // let details = await fetch(`https://pokeapi.co/api/v2/pokemon/${all.pokemon_entries[i].entry_number}`)
        let details = await fetch(`https://pokeapi.co/api/v2/pokemon/${all.pokemon_entries[i].pokemon_species.name}`)
        let data = await details.json()
        pokemon.push(data)
        if (i === leng - 1) {
          console.log(pokemon);
          context.commit('SetAllPokemon', pokemon)
        }
      }
    },

    getLegendaries: async (context) => {
      let pokemon = []
      let res = await fetch("https://pokeapi.co/api/v2/pokemon-species?limit=905&offset=0")
      let all = await res.json()
      console.log(all.results);

      for (let i = 0; i < all.results.length; i++) {
        let detail = await fetch(`${all.results[i].url}`)
        let dat = await detail.json()
        // console.log(i);

        if (dat.is_legendary === true) {
          let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${dat.id}`)
          let data = await res.json()
          pokemon.push(data)
        }

        if (i === all.results.length - 1) {
          // console.log(pokemon);
          // console.log(pokemon[0].species.url);
          context.commit('SetAllPokemon', pokemon)
        }
      }
      // console.log(pokemon);

    },

    getMythicals: async (context) => {
      let pokemon = []
      let res = await fetch("https://pokeapi.co/api/v2/pokemon-species?limit=905&offset=0")
      let all = await res.json()
      console.log(all.results);

      for (let i = 0; i < all.results.length; i++) {
        let detail = await fetch(`${all.results[i].url}`)
        let dat = await detail.json()
        // console.log(i);

        if (dat.is_mythical === true) {
          let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${dat.id}`)
          let data = await res.json()
          pokemon.push(data)
        }

        if (i === all.results.length - 1) {
          // console.log(pokemon);
          // console.log(pokemon[0].species.url);
          context.commit('SetAllPokemon', pokemon)
        }
      }
      // console.log(pokemon);

    },

    getAbility: async (context, pay) => {
      let res = await fetch(`https://pokeapi.co/api/v2/ability/${pay.ability.name}`)
      let data = await res.json()
      console.log(data);

      for (let i = 0; i < data.flavor_text_entries.length; i++) {
        if (data.flavor_text_entries[i].language.name === 'en') {
          data.flavor_text_entries[0].flavor_text = data.flavor_text_entries[i].flavor_text
          // console.log(data.flavor_text_entries.flavor_text);
        }
      }

      for (let i = 0; i < data.effect_entries.length; i++) {
        if (data.effect_entries[i].language.name === 'en') {
          data.effect_entries.effect = data.effect_entries[i].effect
          // console.log(data.effect_entries.effect);
        }
      }

      context.commit('SetAbility', data)
    }
  },
  modules: {}
})