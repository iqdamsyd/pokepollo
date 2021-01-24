import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "../graphql/Queries";

import styled from "@emotion/styled";
import Card from "./Card";
import NavButton from "./NavButton";
import { CardList, ErrorMessage, Loading } from "./Utilities";
import PokemonDetail from "./PokemonDetail";
import Header from "./Header";
import Footer from "./Footer";

const Wrapper = styled.div`
  padding-bottom: 60px;
`;

const PokemonList = ({ offset, setOffset }) => {
  const [showDetail, setShowDetail] = useState();
  const { error, loading, data, refetch } = useQuery(GET_POKEMONS, {
    variables: { limit: 10, offset: offset },
  });

  const handleNext = () => {
    setOffset((offset) => offset + 10);
    refetch({ variables: { limit: 10, offset: offset + 10 } });
  };

  const handlePrev = () => {
    setOffset((offset) => offset - 10);
    refetch({ variables: { limit: 10, offset: offset - 10 } });
  };

  const handleShowDetail = () => {
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  if (loading)
    return (
      <>
        <Header />
        <Loading>Loading...</Loading>
        <Footer handleCloseDetail={handleCloseDetail} />
      </>
    );
  if (error)
    return (
      <>
        <Header />
        <ErrorMessage>Error!</ErrorMessage>
        <Footer handleCloseDetail={handleCloseDetail} />
      </>
    );

  return (
    <>
      {showDetail ? (
        <PokemonDetail />
      ) : (
        <>
          <Header />
          <Wrapper>
            <CardList>
              {data.pokemons.results.map((pokemon) => (
                <Card
                  first={pokemon.id % 2 !== 0 ? true : false}
                  key={pokemon.id}
                  pokemon={pokemon}
                  handleShowDetail={handleShowDetail}
                />
              ))}
            </CardList>
            <NavButton
              handlePrev={handlePrev}
              handleNext={handleNext}
              prevDisabled={offset === 0 ? true : false}
              nextDisabled={offset > data.count ? true : false}
              OffsetEnd={true}
            />
          </Wrapper>
        </>
      )}
      <Footer handleCloseDetail={handleCloseDetail} />
    </>
  );
};

export default PokemonList;
