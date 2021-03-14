import React from "react";
import { v4 as uuidv4 } from "uuid";
// styles
import { makeStyles } from "@material-ui/core/styles";
// components
import PokemonCard from "../../common/PokemonCard";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "calc(100vh - 240px)",
    paddingTop: "2px",
  },
}));

const HomeView = (props) => {
  const classes = useStyles();
  const { pokemonList, handleRelease } = props;

  return (
    <Grid container justify="center" spacing={4} className={classes.root}>
      <Grid item container justify="flex-start">
        {!pokemonList.length ? (
          <Typography variant="body1" color="secondary">
            Zero. Go catch some pokemons.
          </Typography>
        ) : (
          <Typography variant="body1" color="secondary">
            You've caught some good pokemons.
          </Typography>
        )}
      </Grid>

      {pokemonList.map((pokemon) => (
        <Grid item xs={12} sm={6} lg={4} xl={3} key={uuidv4()}>
          <PokemonCard
            pokemon={pokemon}
            handleClick={handleRelease}
            action="release"
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default HomeView;
