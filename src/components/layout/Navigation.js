import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
// styles
import { makeStyles } from "@material-ui/core/styles";
// component
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PublicIcon from "@material-ui/icons/Public";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    width: "100%",
    left: "0",
    bottom: "-1px",
    height: "80px",
    borderRadius: "30px 30px 0 0",
    backgroundColor: "#343D63",
    boxShadow: "0px -2px 5px rgba(0,0,0,.3)",
  },
  selected: {
    color: "#94A6AF",
    "& svg": {
      color: theme.palette.secondary.main,
    },
  },
}));

const refreshLocation = (pathname) => {
  if (pathname === "/mypokemon") return 0;
  if (pathname === "/pokedex" || pathname === "/pokemon") return 1;
  if (pathname === "/settings") return 2;
};

const Navigation = () => {
  const location = useLocation();
  const classes = useStyles();
  const [value, setValue] = useState(refreshLocation(location.pathname));

  const history = useHistory();
  const handleClick = (url) => {
    history.push(url);
  };

  useEffect(() => {
    setValue(refreshLocation(location.pathname));
  }, [location.pathname]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels={false}
      className={classes.root}
    >
      <BottomNavigationAction
        label="My Pokemon"
        icon={<BusinessCenterIcon />}
        classes={{ selected: classes.selected }}
        onClick={() => handleClick("/mypokemon")}
      />
      <BottomNavigationAction
        label="Pokedex"
        icon={<PublicIcon />}
        classes={{ selected: classes.selected }}
        onClick={() => handleClick("/pokedex")}
      />
      <BottomNavigationAction
        label="Settings"
        icon={<SettingsIcon />}
        classes={{ selected: classes.selected }}
        onClick={() => handleClick("/settings")}
      />
    </BottomNavigation>
  );
};

export default Navigation;
