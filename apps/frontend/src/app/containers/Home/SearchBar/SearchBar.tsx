import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { CustomCloseIcon } from "../../../components/CustomCloseIcon/CustomCloseIcon";
import { StyledIcon, StyledInput, StyledSearchBar } from "./SearchBar.style";

export interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  value: string;
}

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
