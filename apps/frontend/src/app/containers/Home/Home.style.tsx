import styled from "styled-components";

export const StyledHome = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-shrink: 1;
  flex-basis: 0;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;
