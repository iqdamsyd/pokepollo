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
import PokemonList from "./components/PokemonList";
import MyPokemonList from "./components/MyPokemonList";
import { UserProvider } from "./hooks/UserContext";
import { PokemonProvider } from "./hooks/PokemonContext";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
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
                      <PokemonList offset={offset} setOffset={setOffset} />
                    </>
                  )}
                />
                <Route
                  path="/mypokemon"
                  render={(props) => (
                    <>
                      <MyPokemonList />
                    </>
                  )}
                />
              </Switch>
            </div>
          </PokemonProvider>
        </UserProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
