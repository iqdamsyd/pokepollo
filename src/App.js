import { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import MyPokemonList from "./components/MyPokemonList";
import { UserProvider } from "./hooks/UserContext";
import { PokemonProvider } from "./hooks/PokemonContext";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://graphql-pokeapi.vercel.app/api/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(), // setup cache
  link: link,
});

function App() {
  const [offset, setOffset] = useState(0);

  return (
    <ApolloProvider client={client}>
      <Router>
        <UserProvider>
          <PokemonProvider>
            <div className="App">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <>
                      <Header />
                      <PokemonList offset={offset} setOffset={setOffset} />
                    </>
                  )}
                />
                <Route
                  path="/pokemon"
                  render={(props) => (
                    <>
                      <PokemonDetail />
                    </>
                  )}
                />
                <Route
                  path="/mypokemon"
                  render={(props) => (
                    <>
                      <Header />
                      <MyPokemonList />
                    </>
                  )}
                />
              </Switch>
              <Footer />
            </div>
          </PokemonProvider>
        </UserProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
