import { useState } from "react";
import styled from "@emotion/styled";
import { Text, Button as ButtonBase, Wrapper } from "./Utilities";
import NavButton from "./NavButton";
import { ModalCatching, ModalRelease } from "./Modals";

import usePokemon from "../hooks/usePokemon";

const CardDetailWrapper = styled(Wrapper)`
  padding-bottom: 70px;
  padding-top: 40px;
  flex-direction: column;
  gap: 40px;
  background-color: white;
  border: 0px;
  border-top-left-radius: 80px;
  border-top-right-radius: 80px;
  box-shadow: 0px -1px 2px rgba(0, 0, 0, 0.3);
`;

const BadgeWrapper = styled(Wrapper)`
  gap: 40px;
`;

const MoveWrapper = styled(Wrapper)`
  width: 260px;
  flex-direction: column;
  align-self: center;
  gap: 20px;
  background-color: white;
  padding: 20px;
  border-top: 1px solid #ddd;
  border-radius: 20px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
`;

const MoveListWrapper = styled(Wrapper)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  margin: 10px 0px;
  gap: 10px;
`;

const Badge = styled.span`
  background-color: green;
  color: white;
  padding: 2.5px 10px;
  padding-bottom: 6px;
  border: 0px;
  border-radius: 20px;
`;

const Button = styled(ButtonBase)`
  align-self: center;
  border-radius: 25px;
  font-size: 2em;
  font-weight: 900;
`;

const CardDetail = ({ pokemon }) => {
  const [prob, setProb] = useState();
  const { getCurrentPokemon, getLastVisitedPage } = usePokemon();
  const [{ start, end }, setSlice] = useState({ start: 0, end: 6 });
  const [showModalCatching, setShowModalCatching] = useState(false);
  const [showModalRelease, setShowModalRelease] = useState(false);

  const pokeMovesLength = pokemon.moves.length;

  const handleCatch = () => {
    console.log("Catch", pokemon);
    setProb(Math.random());
    setShowModalCatching(true);
  };

  const handleRelease = () => {
    console.log("Release", getCurrentPokemon());
    setShowModalRelease(true);
  };

  let button;
  if (getLastVisitedPage().onMyPokemonList) {
    button = (
      <Button Primary onClick={handleRelease}>
        Release
      </Button>
    );
  } else {
    button = (
      <Button Primary onClick={handleCatch}>
        Catch!
      </Button>
    );
  }

  return (
    <>
      <CardDetailWrapper>
        <BadgeWrapper>
          {pokemon.types.map((t) => (
            <Badge key={t.type.name}>{t.type.name}</Badge>
          ))}
        </BadgeWrapper>
        <MoveWrapper>
          <Text Bold Italic TextDark>
            Moves ({pokeMovesLength})
          </Text>
          <MoveListWrapper>
            {pokemon.moves.slice(start, end).map((m) => (
              <Text TextDark key={m.move.name}>
                {m.move.name}
              </Text>
            ))}
          </MoveListWrapper>
          <NavButton
            handlePrev={() => setSlice({ start: start - 6, end: end - 6 })}
            handleNext={() => setSlice({ start: start + 6, end: end + 6 })}
            prevDisabled={start === 0 ? true : false}
            nextDisabled={end > pokeMovesLength ? true : false}
            CardList={false}
          />
        </MoveWrapper>
        {button}
      </CardDetailWrapper>
      {showModalCatching ? (
        <ModalCatching prob={prob} pokemon={pokemon} />
      ) : null}
      {showModalRelease ? (
        <ModalRelease
          showModalRelease={showModalRelease}
          setShowModalRelease={setShowModalRelease}
        />
      ) : null}
    </>
  );
};

export default CardDetail;
