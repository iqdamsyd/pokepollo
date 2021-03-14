import React from "react";
import LandingView from "./LandingView";
import { useHistory } from "react-router-dom";

export const Landing = () => {
  const history = useHistory();

  const handleStart = () => {
    history.push("/pokedex");
  };

  return React.createElement(LandingView, { handleStart });
};
