import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { makeStyles } from "@material-ui/core/styles";

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

export default function AlertDialog({ open, handleClose }) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.root}
      >
        <DialogTitle id="alert-dialog-title">{"Failed!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The Pokemon has run away. <br />
            Try again next time!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
