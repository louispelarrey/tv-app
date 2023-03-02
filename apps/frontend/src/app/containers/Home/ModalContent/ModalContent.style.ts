import styled from "styled-components";

const StyledModalContent = styled.div`
  #close-button {
    position: absolute;
    top: 0;
    right: 0;
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export { StyledModalContent, StyledForm };
