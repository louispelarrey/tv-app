import styled from "styled-components";

const StyledHome = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-shrink: 1;
  flex-basis: 0;
  @media (max-width: 765px) {
    flex-direction: column;
  }
`;

export { StyledHome };
