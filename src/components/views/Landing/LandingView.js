import React from "react";
// styles
import { makeStyles } from "@material-ui/core/styles";
// components
import Button from "@material-ui/core/Button";
import { Grid, Typography } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "calc(100vh - 80px)",
    [theme.breakpoints.up("sm")]: {
      alignItems: "center",
    },
  },
  textContainer: {
    [theme.breakpoints.up("sm")]: {
      alignItems: "center",
    },
  },
  button: {
    borderRadius: "30px",
  },
}));

const LandingView = ({ handleStart }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
      className={classes.root}
    >
      <Grid
        item
        container
        direction="column"
        alignItems="flex-start"
        className={classes.textContainer}
      >
        <Slide direction="right" in={true}>
          <Typography variant="body1" color="textSecondary">
            Welcome to
          </Typography>
        </Slide>
        <Slide direction="right" in={true}>
          <Typography variant="h1" color="secondary">
            Pokepollo
          </Typography>
        </Slide>
      </Grid>
      <Grid item>
        <Fade in={true}>
          <img src="/pokepollo.png" alt="pokepollo" />
        </Fade>
      </Grid>
      <Grid item>
        <Fade in={true}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleStart}
          >
            Get started
          </Button>
        </Fade>
      </Grid>
    </Grid>
  );
};

export default LandingView;
