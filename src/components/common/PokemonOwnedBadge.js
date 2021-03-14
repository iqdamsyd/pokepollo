import React from "react";
import PropTypes from "prop-types";
// styles
import { makeStyles } from "@material-ui/core/styles";
// components
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Slide } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "40px",
    display: "flex",
    alignItems: "center",
    width: "150px",
    padding: "10px 20px",
    backgroundColor: theme.palette.tertiary.main,
  },
  gif: {
    marginRight: "12px",
    height: "24px",
  },
}));

const PokemonOwnedBadge = ({ gifURL, owned }) => {
  const classes = useStyles();

  return (
    <Slide in={true} direction="right">
      <Paper className={classes.root}>
        <img src={gifURL} alt="pokemon gif" className={classes.gif} />
        <Typography variant="body2">Owned: {owned}</Typography>
      </Paper>
    </Slide>
  );
};

PokemonOwnedBadge.propTypes = {
  gifURL: PropTypes.string.isRequired,
  owned: PropTypes.number.isRequired,
};

export default PokemonOwnedBadge;
