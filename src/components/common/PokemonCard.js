import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "340px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#343D63",
    borderRadius: "40px",
    flexDirection: "column",
    rowGap: "40px",
  },
  pokemonImage: {
    height: "112px",
    aspectRatio: "1/1",
  },
  pokemonNumber: {
    fontStyle: "italic",
    fontWeight: "900",
    color: theme.palette.primary.main,
  },
  pokemonName: {
    fontWeight: "900",
    textTransform: "capitalize",
  },
  pokemonNickname: {
    fontWeight: "400",
    color: theme.palette.secondary.main,
  },
  pokemonTypes: {
    width: "30px",
    marginRight: "16px",
  },
  pokemonStats: {
    color: theme.palette.secondary.main,
  },
  button: {
    paddingLeft: "20px",
    paddingRight: "20x",
    borderRadius: "40px",
  },
}));

const padLeadingZero = (num) => {
  let s = num + "";
  while (s.length < 3) s = "0" + s;
  return s;
};

const transformIcon = (type) => {
  return type[0].toUpperCase() + type.slice(1);
};

const PokemonCard = ({ pokemon, handleClick, action, captured }) => {
  const classes = useStyles();
  const { front_default: pokemonImage } = pokemon.sprites;

  return (
    <Slide in={true} direction="up" unmountOnExit>
      <Paper className={classes.root}>
        <Grid
          container
          wrap="nowrap"
          alignItems="center"
          style={{ columnGap: "20px" }}
        >
          <Grid item xs={6}>
            <img
              src={pokemonImage}
              alt={pokemon.name}
              className={classes.pokemonImage}
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignItems="flex-start"
            xs={6}
          >
            <Typography variant="body1" className={classes.pokemonNumber}>
              #{padLeadingZero(pokemon.id)}
            </Typography>
            <Typography variant="h3" className={classes.pokemonName}>
              {pokemon.name}
            </Typography>
            <Typography variant="body1" className={classes.pokemonNickname}>
              {action === "release"
                ? pokemon.nickname
                : captured > 0
                ? "Owned"
                : "Uncaptured"}
            </Typography>
            <Grid item container>
              {pokemon.types.map((poke) => (
                <IconButton edge="start" key={poke.type.name}>
                  <img
                    src={
                      require(`../../assets/icons/Icon_${transformIcon(
                        poke.type.name
                      )}.png`).default
                    }
                    alt={`icon ${poke.type.name}`}
                    className={classes.pokemonTypes}
                  />
                </IconButton>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Typography variant="body2">Height</Typography>
            <Typography variant="body2" className={classes.pokemonStats}>
              {pokemon.height / 10} m
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">Weight</Typography>
            <Typography variant="body2" className={classes.pokemonStats}>
              {pokemon.weight / 10} kg
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">HP</Typography>
            <Typography variant="body2" className={classes.pokemonStats}>
              {pokemon.stats[0].base_stat}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">Attack</Typography>
            <Typography variant="body2" className={classes.pokemonStats}>
              {pokemon.stats[1].base_stat}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">Defense</Typography>
            <Typography variant="body2" className={classes.pokemonStats}>
              {pokemon.stats[2].base_stat}
            </Typography>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => handleClick(pokemon.nickname)}
        >
          {action}
        </Button>
      </Paper>
    </Slide>
  );
};

PokemonCard.propTypes = {
  pokemon: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
  captured: PropTypes.number,
};

export default PokemonCard;
