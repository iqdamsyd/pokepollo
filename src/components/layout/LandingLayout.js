import React from "react";
import Footer from "./Footer";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    padding: "0 20px",
  },
});

const LandingLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      // justify="space-between"
      className={classes.root}
    >
      <Grid item>{children}</Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default LandingLayout;
