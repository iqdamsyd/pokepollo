import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
// styles
import { makeStyles } from "@material-ui/core/styles";
// components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
// icons
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CreateIcon from "@material-ui/icons/Create";

import { usePokeball } from "../../hooks/usePokeball";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    left: "-20px",
    width: "100vw",
    height: "80px",
    zIndex: "999",
    [theme.breakpoints.up("md")]: {
      width: "calc(100vw - 20px)",
      paddingLeft: "20px",
    },
  },
  gridAvatar: {
    "& svg": {
      fontSize: 38,
      color: theme.palette.secondary.main,
    },
  },
  gridProfile: {
    "& div": {
      marginBottom: "-10px",
    },
    "& input": {
      fontSize: "15px",
      fontWeight: "600",
      color: "white",
      backgroundColor: theme.palette.primary.main,
      outline: "none",
      border: "0",
      width: (props) =>
        props.inputLength > 10
          ? `${props.inputLength + 1}ch`
          : `${props.inputLength + 2}ch`,
    },
    "& svg": {
      color: theme.palette.secondary.main,
      height: "18px",
    },
  },
  gridExitButton: {
    "& svg": {
      color: theme.palette.text.secondary,
    },
  },
  grow: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const [username, setUsername] = useState("Iqdam Musayyad");
  const [edit, setEdit] = useState(false);
  const inputRef = useRef();
  const pokeball = usePokeball();
  const classes = useStyles({ inputLength: username.length });

  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEdit = () => {
    setEdit((prev) => !prev);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [edit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(false);
  };

  return (
    <Grid container alignItems="center" wrap="nowrap" className={classes.root}>
      <Grid item className={classes.gridAvatar}>
        <IconButton>
          <AccountCircleIcon />
        </IconButton>
      </Grid>
      <Grid
        item
        container
        direction="column"
        alignItems="flex-start"
        className={classes.gridProfile}
      >
        <form noValidate onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={username}
              onChange={handleChange}
              ref={inputRef}
              disabled={edit ? false : true}
              maxLength={20}
            />
            <IconButton edge="start" onClick={handleEdit}>
              <CreateIcon color="secondary" />
            </IconButton>
          </div>
        </form>
        <Typography variant="body2">
          Pokemon: {pokeball.pokeball.length}
        </Typography>
      </Grid>
      <Grid item className={classes.grow}></Grid>
      <Grid item className={classes.gridExitButton}>
        <IconButton onClick={handleClick}>
          <ExitToAppIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Header;
