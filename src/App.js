import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// REFACTORING
import Layout, { LandingLayout, MainLayout } from "./components/layout";
import Landing from "./components/views/Landing";
import Pokedex from "./components/views/Pokedex";
import Home from "./components/views/Home";
import PokemonDetail from "./components/views/PokemonDetail";
import Settings from "./components/views/Settings";
import { ProvidePokeball } from "./hooks/usePokeball";

// TODO:
// Transition

function App() {
  return (
    <Router>
      <Switch>
        <Route path={["/"]} exact>
          <Layout layout={LandingLayout}>
            <Route path={"/"} exact component={() => <Landing />} />
          </Layout>
        </Route>
        <ProvidePokeball>
          <Route
            path={["/pokedex", "/mypokemon", "/pokemon", "/settings"]}
            exact
          >
            <Layout layout={MainLayout}>
              <Route path={"/pokedex"} exact component={() => <Pokedex />} />
              <Route path={"/mypokemon"} exact component={() => <Home />} />
              <Route
                path={"/pokemon"}
                exact
                component={() => <PokemonDetail />}
              />
              <Route path={"/settings"} exact component={() => <Settings />} />
            </Layout>
          </Route>
        </ProvidePokeball>
      </Switch>
    </Router>
  );
}

export default App;
