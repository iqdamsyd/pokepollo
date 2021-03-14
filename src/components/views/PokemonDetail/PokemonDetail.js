import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useLocation, useHistory } from "react-router-dom";
// components
import PokemonDetailView from "./PokemonDetailView";

import { usePokeball } from "../../../hooks/usePokeball";

import { GET_POKEMON_DETAILS } from "../../../graphql/Queries";

export const PokemonDetail = () => {
  const location = useLocation();
  const history = useHistory();
  const pokeball = usePokeball();

  const { data: { pokemon } = {}, loading, error } = useQuery(
    GET_POKEMON_DETAILS,
    {
      variables: {
        // retrieve name state from location API or from storage API
        name: location.state?.name || localStorage.getItem("pokemon-name"),
      },
    }
  );

  const handleBack = () => {
    history.goBack();
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [catchSuccess, setCatchSuccess] = useState(false);
  const [nickname, setNickname] = useState("");

  const rollChances = () => {
    if (Math.random() < 0.5) {
      setCatchSuccess(true);
    } else {
      setCatchSuccess(false);
    }
  };

  const handleOpenDialog = () => {
    rollChances();
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = () => {
    const updatedPokemon = { ...pokemon, nickname: nickname };
    // call add function
    pokeball.add(updatedPokemon);

    setNickname("");
    handleCloseDialog();
    history.push("/mypokemon");
  };

  return React.createElement(PokemonDetailView, {
    pokemon,
    loading,
    error,
    openDialog,
    catchSuccess,
    nickname,
    handleBack,
    handleOpenDialog,
    handleCloseDialog,
    handleChange,
    handleSubmit,
    countOwned: pokeball.count,
  });
};
