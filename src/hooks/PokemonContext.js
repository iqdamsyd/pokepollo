import { createContext, useState, useRef } from "react";

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [onMyPokemonList, setOnMyPokemonList] = useState(false);
  const currentPokemonRef = useRef();

  currentPokemonRef.current = currentPokemon;

  const changeCurrentPokemon = (pokemon) => {
    setCurrentPokemon(pokemon);
  };

  const getCurrentPokemon = () => {
    return currentPokemonRef.current;
  };

  const rememberLastPageVisited = (boolean) => {
    setOnMyPokemonList(boolean);
    localStorage.setItem(
      "rememberLastVisit",
      JSON.stringify({ onMyPokemonList: boolean })
    );
  };

  const getLastVisitedPage = () => {
    if (!localStorage.getItem("rememberLastVisit")) {
      return { onMyPokemonList: false };
    }
    return JSON.parse(localStorage.getItem("rememberLastVisit"));
  };

  return (
    <PokemonContext.Provider
      value={{
        onMyPokemonList,
        getCurrentPokemon,
        changeCurrentPokemon,
        getLastVisitedPage,
        rememberLastPageVisited,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const PokemonConsumer = PokemonContext.Consumer;

export default PokemonContext;
