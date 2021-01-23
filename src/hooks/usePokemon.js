import { useContext } from "react";
import PokemonContext from "./PokemonContext";

const usePokemon = () => {
  const pokemon = useContext(PokemonContext);

  return pokemon;
};

export default usePokemon;
