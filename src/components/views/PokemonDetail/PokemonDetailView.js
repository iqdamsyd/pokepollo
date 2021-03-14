import React from "react";
import PropTypes from "prop-types";
// styles
import { makeStyles } from "@material-ui/core/styles";
// components
import PokemonOwnedBadge from "../../common/PokemonOwnedBadge";
import PokemonCard from "../../common/PokemonCard";
import Loading from "../../common/Loading";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import AlertDialog from "../../common/AlertDialog";
import FormDialog from "../../common/FormDialog";
// icons
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Typography } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "calc(100vh - 240px)",
    paddingTop: "2px",
  },
  backButton: {
    "& svg": {
      color: theme.palette.secondary.main,
    },
    marginRight: "12px",
  },
  // to cover the fixed bottom navigation
  someSpace: {
    height: "50px",
  },
}));

const PokemonDetailView = (props) => {
  const { pokemon, loading, error } = props;
  const { openDialog, catchSuccess, nickname, countOwned } = props;
  const {
    handleBack, // back to pokedex view
    handleOpenDialog, // open modal wheter its failed or success
    handleCloseDialog, // close modal
    handleChange, // handle change on nickname input
    handleSubmit, // handle submit on nickname input
  } = props;

  const classes = useStyles();
  let owned = 0;
  if (pokemon) {
    owned = countOwned(pokemon.id);
  }

  return (
    <>
      {(error || !pokemon || !pokemon.status) && !loading && (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          <Typography variant="h3" color="secondary" gutterBottom={true}>
            {error ? error.message : "Can't find that pokemon, sorry."}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<KeyboardBackspaceIcon />}
            onClick={handleBack}
          >
            Back
          </Button>
        </Grid>
      )}
      {loading && (
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          <Loading />
        </Grid>
      )}
      {pokemon && pokemon.status && (
        <Grid
          container
          justify="center"
          alignItems="flex-start"
          className={classes.root}
        >
          <Grid container>
            <IconButton className={classes.backButton} onClick={handleBack}>
              <KeyboardBackspaceIcon />
            </IconButton>
            <PokemonOwnedBadge
              gifURL={`http://play.pokemonshowdown.com/sprites/ani/${pokemon.name}.gif`}
              owned={owned}
            />
          </Grid>
          <Grid container justify="center">
            {/* <Slide direction="up" in={true}> */}
            <PokemonCard
              pokemon={pokemon}
              handleClick={handleOpenDialog}
              action="catch!"
              captured={owned}
            />
            {/* </Slide> */}
          </Grid>

          {!catchSuccess && (
            <AlertDialog handleClose={handleCloseDialog} open={openDialog} />
          )}

          {catchSuccess && (
            <FormDialog
              open={openDialog}
              handleClose={handleCloseDialog}
              value={nickname}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          )}
        </Grid>
      )}
    </>
  );
};

PokemonDetailView.propTypes = {
  pokemon: PropTypes.object,
  nickname: PropTypes.string.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  countOwned: PropTypes.func.isRequired,
};

export default PokemonDetailView;
