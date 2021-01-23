import React from "react";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import { Button as ButtonBase, Text as TextBase, Wrapper } from "./Utilities";
import usePokemon from "../hooks/usePokemon";
import useUser from "../hooks/useUser";

const CardWrapper = styled(Wrapper)`
  position: ${(props) => (props.first ? "relative" : "")};
  top: ${(props) => (props.first ? "20px" : "0px")};
  flex-direction: column;
  justify-self: center;
  width: fit-content;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4);

  @media (min-width: 992px) {
    position: inherit;
  }
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
`;

const Text = styled(TextBase)`
  align-self: flex-start;
`;

const Button = styled(ButtonBase)`
  margin-top: 20px;
`;

const reloadOnMyPokemonList = () => {
  return window.location.pathname === "/mypokemon";
};

const Card = ({ first, pokemon }) => {
  const { getAllPokemonCapturedByUser } = useUser();
  const { changeCurrentPokemon, isOnMyPokemonList } = usePokemon();

  let history = useHistory();

  const isCaptured = () => {
    return getAllPokemonCapturedByUser().some(
      (poke) => poke.name === pokemon.name
    );
  };

  const capitalizeNickname = (nickname) => {
    let arrNickname = nickname.split(" ");
    for (let i = 0; i < arrNickname.length; i++) {
      arrNickname[i] =
        arrNickname[i].charAt(0).toUpperCase() + arrNickname[i].substring(1);
    }
    return arrNickname.join(" ");
  };

  const handleClickDetail = () => {
    changeCurrentPokemon(pokemon);
    history.push("/pokemon");
  };

  return (
    <CardWrapper first={first}>
      <Avatar src={pokemon.image} alt={pokemon.name} />
      <Text Italic TextDark>
        #{pokemon.id}
      </Text>
      <Text MediumText Bold TextDark>
        {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
      </Text>
      <Text Italic TextDark>
        {isOnMyPokemonList() || reloadOnMyPokemonList()
          ? capitalizeNickname(pokemon.nickname)
          : isCaptured()
          ? "Captured"
          : "Uncaptured"}
      </Text>
      <Button Primary onClick={handleClickDetail}>
        Details
      </Button>
    </CardWrapper>
  );
};

export default Card;
