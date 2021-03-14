import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "calc(100vh - 240px)",
    paddingTop: "2px",
  },
}));

const Settings = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Typography>Will be added.</Typography>
    </Grid>
  );
};

export default Settings;
