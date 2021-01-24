import styled from "@emotion/styled";
import { useState } from "react";
import { useHistory } from "react-router";
import usePokemon from "../hooks/usePokemon";
import { Wrapper, Button as ButtonBase } from "./Utilities";

const Container = styled(Wrapper)`
  position: fixed;
  bottom: 0;
  width: 100%;
  justify-content: space-around;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.2);
  z-index: 3;
`;

const Button = styled(ButtonBase)`
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: ${(props) => (props.active ? "#E14B4B" : "white")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border-radius: ${(props) => (props.active ? "0px" : "10px")};
  font-size: 1em;
  font-weight: 700;
  &:hover {
    opacity: 1;
  }
`;

const Footer = ({ handleCloseDetail }) => {
  const { rememberOnMyPokemonList } = usePokemon();
  let history = useHistory();
  const [active, setActive] = useState({
    pokedex: window.location.pathname === "/" ? true : false,
    mypokemon: window.location.pathname === "/mypokemon" ? true : false,
  });

  const handleClickPokeDex = () => {
    handleCloseDetail();
    setActive({ pokedex: true, mypokemon: false });
    rememberOnMyPokemonList(false);
    history.push("/");
  };

  const handleClickMyPokemon = () => {
    handleCloseDetail();
    setActive({ mypokemon: true, pokedex: false });
    rememberOnMyPokemonList(true);
    history.push("/mypokemon");
  };

  return (
    <Container>
      <Button
        active={active.pokedex}
        onClick={handleClickPokeDex}
        data-testid="pokedex-button"
      >
        PokeDex
      </Button>
      <Button
        active={active.mypokemon}
        onClick={handleClickMyPokemon}
        data-testid="mypokemon-button"
      >
        My Pokemon
      </Button>
    </Container>
  );
};

export default Footer;
