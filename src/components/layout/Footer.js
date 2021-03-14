import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="body1" color="textSecondary">
        &#169; 2021 &nbsp;&nbsp; &mdash; &nbsp;&nbsp; Develoved by Iqdam
      </Typography>
    </div>
  );
};

export default Footer;
