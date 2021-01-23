import { createContext, useState, useRef } from "react";

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [onMyPokemonList, setOnMyPokemonList] = useState(false);
  const currentPokemonRef = useRef();
  const onMyPokemonListRef = useRef();

  currentPokemonRef.current = currentPokemon;
  onMyPokemonListRef.current = onMyPokemonList;

  const changeCurrentPokemon = (pokemon) => {
    setCurrentPokemon(pokemon);
  };

  const getCurrentPokemon = () => {
    return currentPokemonRef.current;
  };

  const rememberOnMyPokemonList = (boolean) => {
    setOnMyPokemonList(boolean);
    // localStorage.setItem(
    //   "rememberLastVisit",
    //   JSON.stringify({ onMyPokemonList: boolean })
    // );
  };

  const isOnMyPokemonList = () => {
    // if (!localStorage.getItem("rememberLastVisit")) {
    //   return { onMyPokemonList: false };
    // }
    // return JSON.parse(localStorage.getItem("rememberLastVisit"));
    return onMyPokemonListRef.current;
  };

  return (
    <PokemonContext.Provider
      value={{
        onMyPokemonList,
        getCurrentPokemon,
        changeCurrentPokemon,
        isOnMyPokemonList,
        rememberOnMyPokemonList,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const PokemonConsumer = PokemonContext.Consumer;

export default PokemonContext;
