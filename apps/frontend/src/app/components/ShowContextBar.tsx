import { AddShow } from "./AddShow"
import { SearchBar } from "./SearchBar"
import styled from "styled-components"
import { ChangeEvent, MouseEvent } from "react";
import { CreateShowData } from "./ModalContent";

interface ShowContextBarProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
  value: string;
  onSubmit: (data: CreateShowData) => void;
}

const StyledShowContextBar = styled.div`
  position: sticky;
  top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.3rem;
  margin-top: 0.5rem;
  z-index: 3;
`;

export const ShowContextBar = ({ onChange, onClick, value, onSubmit }: ShowContextBarProps) => {
  return (
    <StyledShowContextBar>
      <SearchBar onChange={onChange} onClick={onClick} value={value} />
      <AddShow onSubmit={onSubmit}/>
    </StyledShowContextBar>
  )
}
