import styled from "@emotion/styled";
import { Button as ButtonBase, Wrapper } from "./Utilities";

const Container = styled(Wrapper)`
  width: 100%;
  justify-content: ${(props) =>
    props.OffsetEnd ? "flex-end" : "space-around"};
  padding-right: ${(props) => (props.OffsetEnd ? "30px" : "0px")};
  gap: 40px;

  @media (min-width: 768px) {
    justify-content: center;
  }
`;

const Button = styled(ButtonBase)`
  border-radius: 0px;
  border-bottom: 1px solid black;
  padding: 0px;
  padding-bottom: 4px;
  font-weight: 600;
`;

const NavButton = ({
  handlePrev,
  handleNext,
  prevDisabled,
  nextDisabled,
  OffsetEnd,
}) => {
  return (
    <Container OffsetEnd={OffsetEnd}>
      <Button TextDark onClick={() => handlePrev()} disabled={prevDisabled}>
        Prev
      </Button>
      <Button TextDark onClick={() => handleNext()} disabled={nextDisabled}>
        Next
      </Button>
    </Container>
  );
};

export default NavButton;
