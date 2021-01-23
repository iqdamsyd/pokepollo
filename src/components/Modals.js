import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import {
  Text,
  Button as ButtonBase,
  Input,
  Form,
  Wrapper,
  Alert,
} from "./Utilities";
import useUser from "../hooks/useUser";
import usePokemon from "../hooks/usePokemon";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalWrapper = styled(Wrapper)`
  flex-direction: column;
  gap: 20px;
  width: fit-content;
  height: fit-content;
  background: white;
  color: black;
  padding: 40px;
  border-radius: 4px;
  margin: 0px 20px;
`;

const ButtonWrapper = styled(Wrapper)`
  justify-content: space-between;
  gap: 40px;
`;

const Button = styled(ButtonBase)`
  align-self: center;
  border-radius: 25px;
  font-size: 2em;
  font-weight: 900;
  margin-top: 20px;
`;

const ModalLoading = ({ showModalLoading }) => {
  return (
    <>
      {showModalLoading ? (
        <Background>
          <ModalWrapper>
            <Text TextDark LargeText Bold Italic>
              Loading...
            </Text>
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  );
};

const ModalCatchingFailed = ({
  showModalCatchingFailed,
  setShowModalCatchingFailed,
}) => {
  return (
    <>
      <Background>
        <ModalWrapper>
          <Text LargeText Bold Italic TextDark>
            Failed!
          </Text>
          <Text TextDark>The pokemon has run away.</Text>
          <Text TextDark>Try again next time.</Text>
          <Button Primary onClick={() => setShowModalCatchingFailed(false)}>
            Close
          </Button>
        </ModalWrapper>
      </Background>
    </>
  );
};

const ModalCatchingSuccess = ({
  showModalCatchingSuccess,
  setShowModalCatchingSuccess,
  pokemon,
}) => {
  const { getAllPokemonCapturedByUser, addPokemon } = useUser();
  const { getCurrentPokemon } = usePokemon();
  const [nickname, setNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    setNickname(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(nickname);
    const newPoke = {
      ...pokemon,
      nickname: nickname,
      image: getCurrentPokemon().image,
    };
    const pokeWithSameNickname = getAllPokemonCapturedByUser().filter(
      (poke) => poke.nickname.toLowerCase() === newPoke.nickname.toLowerCase()
    );
    if (pokeWithSameNickname.length) {
      setErrorMessage("Nickname already exists.");
      setSuccessMessage("");
    } else {
      addPokemon(newPoke);
      setSuccessMessage("Saved! Thats a nice nickname.");
      setErrorMessage("");
    }
  };

  return (
    <>
      <Background>
        <ModalWrapper>
          {successMessage ? (
            <>
              <Text LargeText Bold Italic TextDark>
                Saved
              </Text>
              <Text TextDark>{successMessage}</Text>
              <Button
                Primary
                onClick={() => setShowModalCatchingSuccess(false)}
              >
                Ok
              </Button>
            </>
          ) : (
            <>
              <Text LargeText Bold Italic TextDark>
                Success!
              </Text>
              <Text TextDark>
                You have successfully captured the pokemon.
                <br />
                Give it a nickname, and make sure it is unique!
              </Text>
              <Form onSubmit={handleSubmit}>
                {errorMessage ? (
                  <Text Bold>
                    <Alert Error>{errorMessage}</Alert>
                  </Text>
                ) : null}
                <Input
                  type="text"
                  required
                  autoFocus
                  value={nickname}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  Primary
                  disabled={nickname === "" ? true : false}
                >
                  Save
                </Button>
              </Form>
            </>
          )}
        </ModalWrapper>
      </Background>
    </>
  );
};

const ModalCatching = ({ prob, pokemon }) => {
  const [showModalLoading, setShowModalLoading] = useState(false);
  const [showModalCatchingSuccess, setShowModalCatchingSuccess] = useState(
    false
  );
  const [showModalCatchingFailed, setShowModalCatchingFailed] = useState(false);

  useEffect(() => {
    setShowModalLoading(true);
    setTimeout(() => {
      setShowModalLoading(false);
      console.log("Prob:", prob);
      if (prob < 0.5) {
        setShowModalCatchingSuccess(true);
        console.log("Success");
      } else {
        setShowModalCatchingFailed(true);
        console.log("Failed");
      }
    }, 1500);
  }, [prob]);

  return (
    <>
      {showModalLoading ? (
        <ModalLoading showModalLoading={showModalLoading} />
      ) : null}
      {showModalCatchingSuccess ? (
        <>
          <ModalCatchingSuccess
            showModalCatchingSucces={showModalCatchingSuccess}
            setShowModalCatchingSuccess={setShowModalCatchingSuccess}
            pokemon={pokemon}
          />
        </>
      ) : null}
      {showModalCatchingFailed ? (
        <>
          <ModalCatchingFailed
            showModalCatchingFailed={showModalCatchingFailed}
            setShowModalCatchingFailed={setShowModalCatchingFailed}
          />
        </>
      ) : null}
    </>
  );
};

const ModalRelease = ({ showModalRelease, setShowModalRelease }) => {
  const { releasePokemon } = useUser();
  const { getCurrentPokemon, isOnMyPokemonList } = usePokemon();
  let history = useHistory();
  const [pokemonReleased, setPokemonReleased] = useState(false);

  const handleConfirmRelease = () => {
    if (isOnMyPokemonList()) {
      releasePokemon(getCurrentPokemon());
    }
    setPokemonReleased(true);
  };

  const handleCancelRelease = () => {
    setShowModalRelease(false);
  };

  const handleClose = () => {
    setShowModalRelease(false);
    history.push("/mypokemon");
  };

  return (
    <>
      {showModalRelease ? (
        <Background>
          <ModalWrapper>
            {pokemonReleased ? (
              <>
                <Text LargeText Bold Italic TextDark>
                  Released
                </Text>
                <Text TextDark> Pokemon has been released.</Text>
                <Button Primary onClick={handleClose}>
                  Ok
                </Button>
              </>
            ) : (
              <>
                <Text LargeText Bold Italic TextDark>
                  Release Pokemon
                </Text>
                <Text TextDark>Are you sure to release this pokemon?</Text>
                <ButtonWrapper>
                  <Button Primary onClick={handleConfirmRelease}>
                    Yes
                  </Button>
                  <Button Primary onClick={handleCancelRelease}>
                    No
                  </Button>
                </ButtonWrapper>
              </>
            )}
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  );
};

export {
  ModalLoading,
  ModalCatching,
  ModalCatchingSuccess,
  ModalCatchingFailed,
  ModalRelease,
};
