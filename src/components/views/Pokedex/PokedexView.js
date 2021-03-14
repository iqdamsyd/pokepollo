import React from "react";
import { v4 as uuidv4 } from "uuid";
// styles
import { makeStyles } from "@material-ui/core/styles";
// components
import PokemonCardMini from "../../common/PokemonCardMini";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Error from "../../common/Error";
import Loading from "../../common/Loading";
import SearchBar from "../../common/SearchBar";
import Fade from "@material-ui/core/Fade";
import { Zoom } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    top: "-80px",
  },
  pokemonCardMiniContainer: {
    height: "430px",
  },
  buttonLoadMore: {
    position: "relative",
    top: "110px",
  },
  // to cover the fixed bottom navigation
  someSpace: {
    height: "30px",
  },
}));

const PokedexView = (props) => {
  const {
    pokemonList,
    loading,
    error,
    handleLoadMore,
    handleClickDetail,
    handleSubmitSearch,
    isCaptured,
  } = props;
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.root}>
      {error && <Error />}
      {pokemonList &&
        pokemonList.map((pokemon, idx) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={uuidv4()}
            className={classes.pokemonCardMiniContainer}
          >
            <PokemonCardMini
              number={idx + 1}
              pokemon={pokemon}
              handleClick={handleClickDetail}
              captured={isCaptured(pokemon.id)}
            />
          </Grid>
        ))}
      <Grid
        item
        container
        justify="center"
        xs={12}
        className={classes.buttonLoadMore}
      >
        {loading && <Loading />}
        {pokemonList.length > 0 && !loading && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleLoadMore()}
          >
            Load more..
          </Button>
        )}
      </Grid>
      <Grid item xs={12} className={classes.someSpace}></Grid>
      <SearchBar handleSubmit={handleSubmitSearch} />
    </Grid>
  );
};

export default PokedexView;
