import React, { useState } from "react";

import styled from "@emotion/styled";
import Card from "./Card";
import NavButton from "./NavButton";
import { CardList, Text } from "./Utilities";

import useUser from "../hooks/useUser";
import PokemonDetail from "./PokemonDetail";
import Header from "./Header";
import Footer from "./Footer";

const Wrapper = styled.div`
  padding-bottom: 60px;
  text-align: center;
`;

const NoPokemon = styled(Text)`
  margin-top: 20px;
`;

const MyPokemonList = () => {
  const [showDetail, setShowDetail] = useState();
  const { getAllPokemonCapturedByUser } = useUser();
  const [{ start, end }, setSlice] = useState({ start: 0, end: 10 });

  const handlePrev = () => {
    setSlice({ start: start - 10, end: end - 10 });
  };
  const handleNext = () => {
    setSlice({ start: start + 10, end: end + 10 });
  };

  const handleShowDetail = (pokemon) => {
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  const userPokemon = getAllPokemonCapturedByUser();

  return (
    <>
      {showDetail ? (
        <PokemonDetail handleCloseDetail={handleCloseDetail} />
      ) : (
        <>
          <Header />
          <Wrapper>
            {userPokemon.length === 0 ? (
              <NoPokemon Bold TextDark>
                You have not captured any pokemon
              </NoPokemon>
            ) : null}
            <CardList>
              {userPokemon.slice(start, end).map((pokemon, index) => (
                <Card
                  first={index % 2 === 0 ? true : false}
                  key={pokemon.nickname}
                  pokemon={pokemon}
                  handleShowDetail={handleShowDetail}
                />
              ))}
            </CardList>
            {userPokemon.length > 0 && (
              <NavButton
                handlePrev={handlePrev}
                handleNext={handleNext}
                prevDisabled={start === 0 ? true : false}
                nextDisabled={end > userPokemon.length - 1 ? true : false}
                OffsetEnd={true}
              />
            )}
          </Wrapper>
        </>
      )}
      <Footer handleCloseDetail={handleCloseDetail} />
    </>
  );
};

export default MyPokemonList;
