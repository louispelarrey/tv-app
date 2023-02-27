import { Input } from "./Input";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { CustomCloseIcon } from "./CustomCloseIcon";

interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  value: string;
}

const StyledSearchBar = styled.div`
  position: sticky;
  top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 435px;
  margin-top: 0.5rem;
  background-color: #2f374f;
  border-radius: 1.2rem;
  height: 3.5rem;
  padding: 0 1rem 0 1rem;
  border: 2px solid white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);


  @media (max-width: 435px) {
    width: 85%;
  }
`;

const StyledInput = styled(Input)`
  width: 80%;
  background-color: inherit;
  ::placeholder {
    color: lightgray
  }
  color: white;
  border: none;
  :focus-visible {
    outline: none;
    border: none;
  }
  font-size: 1.2rem;
  margin: 0px;
  padding: 0px;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1.9rem;
  :hover {
    cursor: pointer;
  }
`;

export const SearchBar = ({onChange, onClick, value}: SearchBarProps) => {
  return (
    <StyledSearchBar>
      <StyledIcon icon={faSearch} color="white" size="2x" />
      <StyledInput
        type="text"
        placeholder="Rechercher une série"
        onChange={onChange}
        value={value}
      />
      <CustomCloseIcon onClick={onClick} />
    </StyledSearchBar>
  );
};