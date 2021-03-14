import React, { useState } from "react";
import HomeView from "./HomeView";

import { usePokeball } from "../../../hooks/usePokeball";

export const Home = () => {
  const pokeball = usePokeball();
  const [pokemonList, setPokemonList] = useState(pokeball.get() || []);

  const handleRelease = (nickname) => {
    // call release function
    pokeball.release(nickname);
    setPokemonList(pokeball.get());
  };

  return React.createElement(React.memo(HomeView), {
    pokemonList,
    handleRelease,
  });
};
