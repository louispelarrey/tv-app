import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Input } from "../../../components";

const StyledSearchBar = styled.div`
  position: inherit;
  width: 66%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: #2f374f;
  border-radius: 1rem;
  height: 3.5rem;
  padding: 0 1rem 0 1rem;
  border: 2px solid white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
`;

const StyledInput = styled(Input)`
  width: 90%;
  background-color: inherit;
  ::placeholder {
    color: #f1f0f0
  }
  color: white;
  border: none;
  :focus-visible {
    outline: none;
    border: none;
  }
  font-size: 1.15rem;
  margin: 0px;
  padding: 0px;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1.9rem;
  :hover {
    cursor: pointer;
  }
`;

export { StyledSearchBar, StyledInput, StyledIcon };
