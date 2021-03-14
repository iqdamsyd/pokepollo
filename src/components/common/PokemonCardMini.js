import React from "react";
import PropTypes from "prop-types";
// styles
import { makeStyles } from "@material-ui/core/styles";
// component
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// icons
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Zoom } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
  },
  paper: {
    backgroundColor: "#343D63",
    borderRadius: "40px",
    width: "243px",
    height: "300px",
  },
  pokemonImage: {
    "& img": {
      width: "191px",
      webkitFilter: "drop-shadow(0px 2px 3px rgba(0,0,0,.3))",
      filter: "drop-shadow(0px 2px 3px rgba(0,0,0,.3))",
    },
    position: "relative",
    top: "120px",
  },
  pokemonTextContainer: {
    position: "relative",
    top: "118px",
  },
  pokemonTextName: {
    fontSize: "24px",
    textTransform: "capitalize",
  },
  pokemonTextStatus: {
    color: theme.palette.secondary.main,
  },
  pokemonNumber: {
    fontSize: "98px",
    color: theme.palette.primary.main,
    fontStyle: "oblique",
    fontWeight: "900",
    // position: "relative",
    // top: "26px",
  },
  button: {
    position: "relative",
    bottom: "-80px",
    borderRadius: "40px",
    paddingLeft: "30px",
    paddingRight: "30px",
  },
}));

const padLeadingZero = (num) => {
  let s = num + "";
  while (s.length < 3) s = "0" + s;
  return s;
};

const PokemonCardMini = ({ number, pokemon, handleClick, captured }) => {
  const { name, image } = pokemon;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid item className={classes.pokemonImage}>
        {/* High-res image from another resource */}
        {/* <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${no}.png`}
          alt="bulbasaur official artwork"
        /> */}
        <img src={image} alt={`${name} sprite`} />
      </Grid>
      <Paper className={classes.paper}>
        <div className={classes.pokemonTextContainer}>
          <Typography variant="h3" className={classes.pokemonTextName}>
            {name}
          </Typography>
          <Typography variant="body1" className={classes.pokemonTextStatus}>
            {captured ? "Owned" : "Uncaptured"}
          </Typography>
          <h1 className={classes.pokemonNumber}>#{padLeadingZero(number)}</h1>
        </div>
        <Button
          variant="contained"
          color="secondary"
          endIcon={<NavigateNextIcon />}
          className={classes.button}
          onClick={() => handleClick(name)}
        >
          Detail
        </Button>
      </Paper>
    </div>
  );
};

PokemonCardMini.propTypes = {
  pokemon: PropTypes.object.isRequired,
  number: PropTypes.number.isRequired,
};

export default PokemonCardMini;
