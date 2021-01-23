import { createContext, useState, useRef } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userPokemonList, setUserPokemonList] = useState([]);
  const userPokemonListRef = useRef();

  userPokemonListRef.current = userPokemonList;

  const addPokemon = (pokemon) => {
    let newPokemonList;
    if (!localStorage.getItem("myPokemonList")) {
      newPokemonList = [pokemon];
      localStorage.setItem("myPokemonList", JSON.stringify(newPokemonList));
    } else {
      const oldPokemonList = JSON.parse(localStorage.getItem("myPokemonList"));
      newPokemonList = [pokemon, ...oldPokemonList];
      localStorage.setItem("myPokemonList", JSON.stringify(newPokemonList));
    }
    setUserPokemonList(newPokemonList);
  };

  const releasePokemon = (pokemon) => {
    let pokemonList = JSON.parse(localStorage.getItem("myPokemonList"));
    let newPokemonList = pokemonList.filter(
      (poke) => poke.nickname !== pokemon.nickname
    );
    localStorage.setItem("myPokemonList", JSON.stringify(newPokemonList));
    setUserPokemonList(newPokemonList);
  };

  const getTotalPokemonOwnedByUser = () => {
    if (!localStorage.getItem("myPokemonList")) {
      return 0;
    }
    const total = JSON.parse(localStorage.getItem("myPokemonList")).length;
    return total;
  };

  const getAllPokemonCapturedByUser = () => {
    if (!localStorage.getItem("myPokemonList")) {
      return [];
    }
    const AllPokemon = JSON.parse(localStorage.getItem("myPokemonList"));
    return AllPokemon;
  };

  return (
    <UserContext.Provider
      value={{
        addPokemon,
        releasePokemon,
        getTotalPokemonOwnedByUser,
        getAllPokemonCapturedByUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserConsumer = UserContext.Consumer;

export default UserContext;
