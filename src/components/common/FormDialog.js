import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { makeStyles } from "@material-ui/core/styles";

import { usePokeball } from "../../hooks/usePokeball";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {
      backgroundColor: theme.palette.primary.main,
      alignItems: "center",
      paddingBottom: "16px",
      "& button": {
        borderRadius: "40px",
        paddingLeft: "20px",
        paddingRight: "20px",
      },
      "& h2": {
        color: theme.palette.secondary.main,
        fontWeight: "800",
      },
    },
  },
}));

export default function FormDialog({
  open,
  value,
  handleClose,
  handleChange,
  handleSubmit,
}) {
  const classes = useStyles();
  const pokeball = usePokeball();
  const [isFound, setIsFound] = useState(false);

  const preSubmit = () => {
    const pokemonList = pokeball.get();
    const found = pokemonList.find((pokemon) => pokemon.nickname === value);
    if (found) {
      setIsFound(true);
    } else {
      setIsFound(false);
      handleSubmit();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle id="form-dialog-title">Success!</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Before saving this pokemon, give it a unique nickname!
            {isFound && (
              <span style={{ color: "red" }}>
                <br />
                One of your pokemon has this nickname, try another nickname.
              </span>
            )}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Pokemon Nickname"
            type="text"
            placeholder="Nickname.."
            fullWidth
            onChange={handleChange}
            value={value}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={preSubmit}
            color="secondary"
            disabled={!value || !value.trim().length ? true : false}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
