import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const BASE_URL = "https://pokeapi.co/api/v2/";

const initialState = {
  pokemons: [],
  selectedPokemon: null,
  isLoading: true,
  error: null,
  currPokeIndex: 0,
  size: 0,
};

export const fetchPokeDeck = createAsyncThunk(
  "poke/fetchPokeDeck",
  async () => {
    // using pokedex/2 for the ending point
    // in this deck, it has 151 pokemons
    const res = await fetch(BASE_URL + "pokedex/2");
    const data = await res.json();

    const validTypes = {
      fire: true,
      water: true,
      grass: true,
    };

    // get pokemon info
    const pokeLists = await Promise.all(
      data.pokemon_entries.map(async (entry) => {
        const name = entry.pokemon_species.name;
        const entryRes = await fetch(`${BASE_URL}/pokemon/${name}`);
        const entryData = await entryRes.json();
        const type = entryData.types.find((t) => validTypes[t.type.name]);

        // if it is not valid pokemon type (grass,fire,water)
        // then return as null
        if (!type) return null;

        return {
          id: entryData.id,
          name: entryData.name,
          sprite: entryData.sprites.front_default,
          type: type.type.name,
        };
      })
    );

    // get rid of null items from the list
    const validPokemons = pokeLists.filter((valid) => valid);

    // get evolution chain url
    const evolvePokemon = await Promise.all(
      validPokemons.map(async (entry) => {
        const entryRes = await fetch(`${BASE_URL}/pokemon-species/${entry.id}`);
        const entryData = await entryRes.json();
        return { ...entry, evolution_chain: entryData.evolution_chain };
      })
    );

    // get evolution numbers
    const chainPokemon = await Promise.all(
      evolvePokemon.map(async (entry) => {
        const entryRes = await fetch(entry.evolution_chain.url);
        const entryData = await entryRes.json();
        const evolvedPath = {};

        // since pokemon can evolve in multiple ways
        // I used recursion in this function
        // to store the evolution paths in the array
        evolveRecursion(entryData.chain, 0);
        function evolveRecursion(obj, evolved) {
          evolvedPath[obj.species.name] = { name: obj.species.name, evolved };
          if (!obj.evolves_to) return;
          for (let nextObj of obj.evolves_to) {
            evolveRecursion(nextObj, evolved + 1);
          }
        }

        // we don't need this chain anymore
        delete entry.evolution_chain;

        return { ...entry, evolvedPath };
      })
    );

    return chainPokemon;
  }
);

const pokeSlice = createSlice({
  name: "poke",
  initialState,
  reducers: {
    nextPokemon: (state) => {
      let nextIndex = state.currPokeIndex + 1;
      if (state.size - 1 < nextIndex) nextIndex = 0;
      state.selectedPokemon = state.pokemons[nextIndex];
      state.currPokeIndex = nextIndex;
    },
    prevPokemon: (state) => {
      let nextIndex = state.currPokeIndex - 1;
      if (nextIndex < 0) nextIndex = state.size - 1;
      state.selectedPokemon = state.pokemons[nextIndex];
      state.currPokeIndex = nextIndex;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokeDeck.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPokeDeck.fulfilled, (state, action) => {
        state.pokemons = action.payload;
        state.selectedPokemon = action.payload[0];
        state.size = action.payload.length;
        state.isLoading = false;
      })
      .addCase(fetchPokeDeck.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { nextPokemon, prevPokemon } = pokeSlice.actions;

export default pokeSlice.reducer;
