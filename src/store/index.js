import { createStore } from "vuex";

export default createStore({
  state: {
    allPokemon: [],
    pokemon: null,
    ability: null,
    count: null,
    length: null,
    creators: [
      {
        name: "Abdus-Samad Charles",
        github: "https://www.github.com/A-SCharles",
        linkedin: "https://www.linkedin.com/in/abdus-samad-charles-51bba5227/",
        banner:
          "https://media-exp1.licdn.com/dms/image/C4D16AQF_VY39Ftm2mQ/profile-displaybackgroundimage-shrink_350_1400/0/1659707739150?e=1669852800&v=beta&t=3nmMlNUX5u2NFhFUuvPNVEe16ASvJW5ctuI1wMy_1AA",
        image: "https://i.postimg.cc/fLBvCyGX/1638605458244.jpg",
        bio: "An aspiring fullstack web developer.",
      },
      {
        name: "Ikhlaas Rawoot",
        github: "https://github.com/ikhlaas21",
        linkedin: "https://www.linkedin.com/in/ikhlaas-rawoot-531a71201/",
        banner:
          "https://media-exp1.licdn.com/dms/image/C4D16AQF_VY39Ftm2mQ/profile-displaybackgroundimage-shrink_350_1400/0/1659707739150?e=1669852800&v=beta&t=3nmMlNUX5u2NFhFUuvPNVEe16ASvJW5ctuI1wMy_1AA",
        image: "https://i.postimg.cc/0y4RW2qT/1658239864183.jpg",
        bio: "An aspiring fullstack web developer.",
      },
    ],
  },
  getters: {},
  mutations: {
    SetAllPokemon: (state, allPokemon) => {
      state.allPokemon = allPokemon;
      // console.log(allPokemon[0]);
    },
    SetPokemon: (state, pokemon) => {
      state.pokemon = pokemon;
      // console.log(Pokemon[1].chain.evolves_to[0].species.name);
      console.log(pokemon);
    },
    SetAbility: (state, ability) => {
      state.ability = ability;
      // console.log(ability);
    },
  },
  actions: {
    getAllPokemon: async (context) => {
      context.state.allPokemon = [];
      // let pokemon = [];

      let res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1158&offset=0"
      );
      let all = await res.json();

      // for (let i = 0; i < all.results.length; i++) {
      //   // console.log(i);
      //   // console.log(all.results.length);
      //   context.state.count = i
      //   context.state.length = all.results.length
      //   let details = await fetch(`https://pokeapi.co/api/v2/pokemon/${all.results[i].name}`)
      //   let data = await details.json()
      //   pokemon.push(data)
      //   console.log(pokemon);
      //   // context.state.allPokemon += pokemon
      //   if (i === all.results.length - 1) {
      //     console.log(pokemon[0]);
      //     context.commit('SetAllPokemon', pokemon)
      //   }
      // }
      for (let i = 0; i < all.results.length; i++) {
        context.state.count = i;
        context.state.length = all.results.length;
        let details = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${all.results[i].name}`
        );
        let data = await details.json();
        context.state.allPokemon.push(data);
      }
    },

    getDetails: async (context, pokemon) => {
      // console.log(pokemon);

      let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
      let data = await res.json();
      console.log(data);

      let evo = await fetch(data.species.url);
      let final = await evo.json();
      console.log(final);
      let evolvesfrom = null;

      if (final.evolves_from_species != null) {
        evolvesfrom = final.evolves_from_species.name;
      }

      if (final.evolution_chain != null) {
        var ch = await fetch(final.evolution_chain.url);
        var cahin = await ch.json();
        console.log(cahin);
        // console.log(cahin.chain.evolves_to);
        var evolvesto = null;

        if (cahin.chain.evolves_to.length != 0) {
          if (cahin.chain.evolves_to[0].species.name != evolvesfrom) {
            evolvesto = cahin.chain.evolves_to[0].species.name;
          }
          // console.log(cahin.chain.evolves_to[0]);

          if (cahin.chain.evolves_to[0].species.name === data.name) {
            if (cahin.chain.evolves_to[0].evolves_to[0] === undefined) {
              evolvesto = null;
            } else {
              evolvesto = cahin.chain.evolves_to[0].evolves_to[0].species.name;
            }
          }
        }
      }

      for (let i = 0; i < final.flavor_text_entries.length; i++) {
        if (final.flavor_text_entries[i].language.name === "en") {
          final.flavor_text_entries[0].flavor_text =
            final.flavor_text_entries[i].flavor_text;
          // console.log(final.flavor_text_entries[0].flavor_text);
        }
      }

      // variety images
      let vari = final.varieties;
      // let varsprites = []
      for (let i = 0; i < vari.length; i++) {
        // console.log(vari[i].pokemon.url);
        let res = await fetch(vari[i].pokemon.url);
        let data = await res.json();
        // console.log(data.sprites);
        // varsprites.push(data.sprites)
        final.varieties[i].pokemon.sprites = data.sprites;
      }

      // eevee shit, becuase why not ?
      if (pokemon == 133) {
        console.log(final.evolution_chain.url);
        let url = await fetch(final.evolution_chain.url);
        let data = await url.json();
        console.log(data.chain);
      }

      data.bar = final;

      context.commit("SetPokemon", {
        data,
        evolvesfrom,
        evolvesto,
      });
    },

    getRegion: async (context, region) => {
      // console.log(region);
      context.state.allPokemon = [];
      let pokemon = [];
      let res = await fetch(`https://pokeapi.co/api/v2/pokedex/${region}`);
      let all = await res.json();
      // console.log(all);
      let leng = all.pokemon_entries.length;

      for (let i = 0; i < leng; i++) {
        context.state.count = i;
        context.state.length = leng;
        if (all.pokemon_entries[i].pokemon_species.name === "deoxys") {
          // console.log(all.pokemon_entries[i]);
          all.pokemon_entries[i].pokemon_species.name = 386;
        }
        if (all.pokemon_entries[i].pokemon_species.name === "wormadam") {
          // console.log(all.pokemon_entries[i]);
          all.pokemon_entries[i].pokemon_species.name = "wormadam-plant";
        }
        if (all.pokemon_entries[i].pokemon_species.name === "giratina") {
          // console.log(all.pokemon_entries[i]);
          all.pokemon_entries[i].pokemon_species.name = "giratina-altered";
        }
        // console.log(i);
        // let details = await fetch(`https://pokeapi.co/api/v2/pokemon/${all.pokemon_entries[i].entry_number}`)
        let details = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${all.pokemon_entries[i].pokemon_species.name}`
        );
        let data = await details.json();
          context.state.allPokemon.push(data);
          // pokemon.push(data);
        // if (i === leng - 1) {
        //   console.log(pokemon);
        //   context.commit("SetAllPokemon", pokemon);
        // }
      }
    },

    getLegendaries: async (context) => {
      context.state.allPokemon = [];

      // let pokemon = [];
      // let res = await fetch(
      //   "https://pokeapi.co/api/v2/pokemon-species?limit=905&offset=0"
      // );
      // let all = await res.json();
      // console.log(all.results);

      // for (let i = 0; i < all.results.length; i++) {
      //   context.state.count = i;
      //   context.state.length = all.results.length;

      //   let detail = await fetch(`${all.results[i].url}`);
      //   let dat = await detail.json();
      //   // console.log(i);

      //   if (dat.is_legendary === true) {
      //     let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${dat.id}`);
      //     let data = await res.json();
      //     pokemon.push(data);
      //   }

      //   if (i === all.results.length - 1) {
      //     // console.log(pokemon);
      //     // console.log(pokemon[0].species.url);
      //     context.commit("SetAllPokemon", pokemon);
      //   }
      
      // let pokemon = [];
      let res = await fetch(
        "https://pokeapi.co/api/v2/pokemon-species?limit=905&offset=0"
      );
      let all = await res.json();

      for (let i = 0; i < all.results.length; i++) {
        context.state.count = i;
        context.state.length = all.results.length;

        let detail = await fetch(`${all.results[i].url}`);
        let dat = await detail.json();

        if (dat.is_legendary === true) {
          let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${dat.id}`);
          let data = await res.json();
          console.log(data)
          context.state.allPokemon.push(data);
        }

        // if (i === all.results.length - 1) {
        //   context.commit("SetAllPokemon", pokemon);
        // }
      }
    },

    getMythicals: async (context) => {
      context.state.allPokemon = [];
      let pokemon = [];
      let res = await fetch(
        "https://pokeapi.co/api/v2/pokemon-species?limit=905&offset=0"
      );
      let all = await res.json();
      console.log(all.results);

      for (let i = 0; i < all.results.length; i++) {
        context.state.count = i;
        context.state.length = all.results.length;

        let detail = await fetch(`${all.results[i].url}`);
        let dat = await detail.json();

        if (dat.is_mythical === true) {
          let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${dat.id}`);
          let data = await res.json();
          context.state.allPokemon.push(data);
          // pokemon.push(data);
        }

        // if (i === all.results.length - 1) {
        //   context.commit("SetAllPokemon", pokemon);
        // }
      }
    },

    getAbility: async (context, pay) => {
      let res = await fetch(
        `https://pokeapi.co/api/v2/ability/${pay.ability.name}`
      );
      let data = await res.json();
      console.log(data);

      for (let i = 0; i < data.flavor_text_entries.length; i++) {
        if (data.flavor_text_entries[i].language.name === "en") {
          data.flavor_text_entries[0].flavor_text =
            data.flavor_text_entries[i].flavor_text;
          // console.log(data.flavor_text_entries.flavor_text);
        }
      }

      for (let i = 0; i < data.effect_entries.length; i++) {
        if (data.effect_entries[i].language.name === "en") {
          data.effect_entries.effect = data.effect_entries[i].effect;
          // console.log(data.effect_entries.effect);
        }
      }

      context.commit("SetAbility", data);
    },
  },
  modules: {},
});
