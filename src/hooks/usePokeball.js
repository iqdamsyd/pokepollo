import React, { useState, useContext, createContext } from "react";

const pokeballContext = createContext();

// Provider component that wraps the app and makes pokeball ...
// ... object available to any child component that calls usePokeball()
export function ProvidePokeball({ children }) {
  const pokeball = useProvidePokeball();
  return (
    <pokeballContext.Provider value={pokeball}>
      {children}
    </pokeballContext.Provider>
  );
}

// Hook for child components to get the pokeball object ...
// ... and re-render when it changes
export const usePokeball = () => {
  return useContext(pokeballContext);
};

// Provider hook that creates pokeball object and handle state
function useProvidePokeball() {
  const [pokeball, setPokeball] = useState(
    JSON.parse(localStorage.getItem("my-pokemon-list")) || []
  );

  const add = (newPokemon) => {
    // add pokemon logic
    const newPokemonList = [newPokemon, ...pokeball];
    localStorage.setItem("my-pokemon-list", JSON.stringify(newPokemonList));
    setPokeball(newPokemonList);
  };

  const release = (nickname) => {
    // release pokemon logic
    const reducedPokemonList = pokeball.filter(
      (pokemon) => pokemon.nickname !== nickname
    );
    localStorage.setItem("my-pokemon-list", JSON.stringify(reducedPokemonList));
    setPokeball(reducedPokemonList);
  };

  const count = (pokemonID) => {
    return pokeball.filter((pokemon) => pokemon.id === pokemonID).length;
  };

  const get = () => {
    return JSON.parse(localStorage.getItem("my-pokemon-list")) || [];
  };

  return {
    pokeball,
    add,
    release,
    get,
    count,
  };
}
