import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "../graphql/Queries";

import styled from "@emotion/styled";
import CardList from "./CardList";
import Card from "./Card";
import NavButton from "./NavButton";
import { ErrorMessage, Loading } from "./Utilities";

const Wrapper = styled.div`
  padding-bottom: 60px;
`;

const PokemonList = ({ offset, setOffset }) => {
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

  if (loading) return <Loading>Loading...</Loading>;
  if (error) return <ErrorMessage>Error!</ErrorMessage>;

  return (
    <Wrapper>
      <CardList>
        {data.pokemons.results.map((pokemon) => (
          <Card
            first={pokemon.id % 2 !== 0 ? true : false}
            key={pokemon.id}
            pokemon={pokemon}
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
  );
};

export default PokemonList;
