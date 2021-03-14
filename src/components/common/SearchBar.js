import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  searchPaper: {
    // position: "-webkit-sticky",
    position: "fixed",
    top: "82px",
    right: "0px",
    // right: "-20px",
    borderRadius: "20px 0 0 20px",
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    alignItems: "center",
    zIndex: "999",
    "& form": {
      marginBottom: "4px",
    },
  },
  searchInput: {
    padding: "6px",
    marginRight: "10px",
    backgroundColor: theme.palette.secondary.main,
    color: "black",
    fontFamily: "Lato",
    fontSize: "16px",
    fontWeight: "700",
    border: "0",
    outline: "0",
  },
}));

const SearchBar = ({ handleSubmit }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const submitValue = (e) => {
    e.preventDefault();
    handleSubmit(value);
    setValue("");
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <Paper className={classes.searchPaper}>
      <IconButton onClick={handleClick}>
        <SearchIcon />
      </IconButton>
      {open && (
        <form onSubmit={(e) => submitValue(e)}>
          <input
            type="text"
            name="search"
            placeholder="Search pokemon"
            autoFocus
            width="15"
            maxLength="20"
            className={classes.searchInput}
            value={value}
            onChange={handleChange}
          />
        </form>
      )}
    </Paper>
  );
};

export default SearchBar;
