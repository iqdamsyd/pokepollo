import React, { useState, useEffect } from "react";
import { useQuery, NetworkStatus } from "@apollo/client";
import { useHistory } from "react-router-dom";
// component
import PokedexView from "./PokedexView";

import { usePokeball } from "../../../hooks/usePokeball";

import { GET_POKEMONS } from "../../../graphql/Queries";

export const Pokedex = () => {
  const pokeball = usePokeball();
  const [pokemonList, setPokemonList] = useState([]);
  const history = useHistory();
  const {
    data: { pokemons: { results } = {} } = {},
    loading,
    error,
    refetch,
    networkStatus,
  } = useQuery(GET_POKEMONS, {
    variables: { limit: 12, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (results) {
      const newPokemonList = [...pokemonList, ...results];
      setPokemonList(newPokemonList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  const handleLoadMore = () => {
    refetch({ limit: 12, offset: pokemonList.length });
  };

  const handleClickDetail = (pokemonName) => {
    history.push("/pokemon", { name: pokemonName });
    localStorage.setItem("pokemon-name", pokemonName);
  };

  const handleSubmitSearch = (pokemonName) => {
    history.push("/pokemon", { name: pokemonName });
    localStorage.setItem("pokemon-name", pokemonName);
  };

  const isCaptured = (pokemonID) => {
    return pokeball.count(pokemonID) > 0;
  };

  return React.createElement(PokedexView, {
    pokemonList,
    loading,
    error,
    handleLoadMore,
    networkStatus,
    NetworkStatus,
    handleClickDetail,
    handleSubmitSearch,
    isCaptured,
  });
};
