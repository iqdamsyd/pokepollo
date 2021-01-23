import styled from "@emotion/styled";
import useUser from "../hooks/useUser";
import { Wrapper } from "./Utilities";

const HeaderWrapper = styled(Wrapper)`
  justify-content: space-between;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 10px 20px;
  background-color: white;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

const Brand = styled.h1`
  color: #e14b4b;
  font-weight: 800;
`;

const OwnedPokemon = styled.span`
  color: #333;
  font-weight: 800;
  font-size: 1em;
`;

const Header = () => {
  const { getTotalPokemonOwnedByUser } = useUser();
  return (
    <HeaderWrapper>
      <Brand>PokeDex</Brand>
      <OwnedPokemon>Owned: {getTotalPokemonOwnedByUser()}</OwnedPokemon>
    </HeaderWrapper>
  );
};

export default Header;
