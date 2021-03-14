import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    padding: "0 20px",
  },
  someSpace: {
    height: "100px",
  },
});

const MainLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Header />
      {children}
      <div className={classes.someSpace}></div>
      <Navigation />
    </main>
  );
};

export default MainLayout;
