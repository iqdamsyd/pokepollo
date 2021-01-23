import styled from "@emotion/styled";

const CardList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 0px;
  align-content: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 40px;
  @media (min-width: 992px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 40px 0px;
  }
`;

export default CardList;
