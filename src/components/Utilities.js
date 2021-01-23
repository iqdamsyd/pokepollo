import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  font-size: ${(props) => {
    switch (true) {
      case props.ExtraLargeText:
        return "2.5em";
      case props.LargeText:
        return "2em";
      case props.MediumText:
        return "1.5em";
      default:
        return "1em";
    }
  }};
  font-weight: ${(props) => {
    switch (true) {
      case props.Black:
        return 800;
      case props.Bold:
        return 700;
      case props.SemiBold:
        return 600;
      case props.Light:
        return 200;
      default:
        return 400;
    }
  }};
  font-style: ${(props) => (props.Italic ? "italic" : "")};
  color: ${(props) => (props.TextDark ? "#333" : "white")};
`;

const Button = styled.button`
  padding: 5px 20px;
  border: 0px;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  background-color: ${(props) => (props.Primary ? "#e14b4b" : "white")};
  color: ${(props) => (props.TextDark ? "#333" : "white")};
  &:disabled {
    cursor: default;
    opacity: 0.3;
    &:hover {
      opacity: 0.3;
    }
  }
  &:hover {
    opacity: 0.9;
  }
`;

const ErrorMessage = styled.div`
  margin: 80px 0px;
  color: red;
  font-weight: 700;
  text-align: center;
`;

const Loading = styled.div`
  margin: 80px 0px;
  color: black;
  font-weight: 700;
  text-align: center;
`;

const Input = styled.input`
  font-size: 1em;
  padding: 5px 10px;
  outline: none;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Alert = styled.span`
  color: ${(props) => {
    switch (true) {
      case props.Success:
        return "green";
      case props.Error:
        return "red";
      default:
        return "white";
    }
  }};
`;

const Badge = styled.span`
  background-color: ${(props) => {
    switch (props.type) {
      case "water":
        return "#6390F0";
      case "fire":
        return "#EE8130";
      case "electric":
        return "#F7D02C";
      case "grass":
        return "#7AC74C";
      case "ice":
        return "#96D9D6";
      case "fighting":
        return "#C22E28";
      case "poison":
        return "#A33EA1";
      case "ground":
        return "#E2BF65";
      case "flying":
        return "#A98FF3";
      case "psychic":
        return "lavender";
      case "bug":
        return "#06600A";
      case "rock":
        return "#A6A29A";
      case "ghost":
        return "#735797";
      case "dragon":
        return "#6F35FC";
      case "dark":
        return "#705746";
      case "steel":
        return "#B7B7CE";
      case "fairy":
        return "#D685AD";
      default:
        return "#A8A77A";
    }
  }};
  color: white;
  padding: 2.5px 10px;
  padding-bottom: 6px;
  border: 0px;
  border-radius: 20px;
`;

export {
  Text,
  Button,
  Wrapper,
  ErrorMessage,
  Loading,
  Input,
  Form,
  Alert,
  Badge,
};
