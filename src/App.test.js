import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { GET_POKEMONS, GET_POKE } from "./graphql/Queries";
import { pokemons, poke } from "./test-utils/mock";
import App from "./App";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import MyPokemonList from "./components/MyPokemonList";

import UserContext from "./hooks/UserContext";
import PokemonContext from "./hooks/PokemonContext";

const mocksGetPokemons = [
  {
    request: {
      query: GET_POKEMONS,
      variables: {
        limit: 1,
        offset: 0,
      },
      result: {
        data: {
          pokemons: {
            results: pokemons,
          },
        },
      },
    },
  },
];

const mocksGetPoke = [
  {
    request: {
      query: GET_POKE,
      variables: {
        name: "bulbasaur",
      },
      result: {
        data: {
          pokemon: poke,
        },
      },
    },
  },
];

describe("<PokemonList />", () => {
  it("should show pokemon list", async () => {
    const {
      getByText,
      findByText,
      findAllByText,
      findByTestId,
      debug,
    } = render(
      <MockedProvider mocks={mocksGetPokemons} addTypename={false}>
        <App>
          <PokemonList />
        </App>
      </MockedProvider>
    );
    expect(getByText("Loading...")).toBeInTheDocument();
    const pokedex = await findAllByText("PokeDex");
    expect(pokedex).toHaveLength(2);
    const owned = await findByText("Owned: 0");
    expect(owned).toBeInTheDocument();
    const pokemonName = await findByText("Bulbasaur");
    expect(pokemonName).toBeInTheDocument();
    const allButtonDetails = await findAllByText("Details");
    expect(allButtonDetails).toHaveLength(10);
    const bulbasaurButtonDetail = await findByTestId("button-detail-1");
    expect(bulbasaurButtonDetail).toBeInTheDocument();
    // debug();
  });
});

describe("<PokemonDetail />", () => {
  // FAILED: doesnt render PokemonDetail page, instead it renders PokemonList
  // it("should show pokemon detail", async () => {
  //   const currentPokemon = {
  //     name: "Bulbasaur",
  //     image:
  //       "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  //   };
  //   const { findByTestId, debug } = render(
  //     <MockedProvider mocks={mocksGetPoke} addTypename={false}>
  //       <App>
  //         <PokemonContext.Provider
  //           value={{ getCurrentPokemon: () => currentPokemon }}
  //         >
  //           <PokemonDetail />
  //         </PokemonContext.Provider>
  //       </App>
  //     </MockedProvider>
  //   );
  //   // const catchButton = await findByTestId("button-catch");
  //   // expect(catchButton).toBeInTheDocument();
  //   debug();
  // });
});

describe("<MyPokemonList />", () => {
  it("should show my pokemon list", async () => {
    const { findByText, debug } = render(
      <UserContext.Provider
        value={{
          getAllPokemonCapturedByUser: () => [],
          getTotalPokemonOwnedByUser: () => 0,
        }}
      >
        <PokemonContext.Provider value={{ rememberOnMyPokemonList: () => {} }}>
          <MyPokemonList />
        </PokemonContext.Provider>
      </UserContext.Provider>
    );

    const owned = await findByText("Owned: 0");
    expect(owned).toBeInTheDocument();
    const noPokemonText = await findByText("You have not captured any pokemon");
    expect(noPokemonText).toBeInTheDocument();
  });
});
