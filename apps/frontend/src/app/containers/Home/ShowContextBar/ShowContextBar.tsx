import { AddShow } from "../AddShow/AddShow"
import { SearchBar } from "../SearchBar/SearchBar"
import { ChangeEvent, MouseEvent } from "react";
import { CreateShowData } from "../ModalContent/ModalContent";
import StyledShowContextBar from "./ShowContextBar.style";

interface ShowContextBarProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
  value: string;
  onSubmit: (data: CreateShowData) => void;
  openModal: () => void;
  closeModal: () => void;
  openModalState: boolean;
}

export const ShowContextBar = ({ onChange, onClick, value, onSubmit, openModal, closeModal, openModalState }: ShowContextBarProps) => {
  return (
    <StyledShowContextBar>
      <SearchBar onChange={onChange} onClick={onClick} value={value} />
      <AddShow onSubmit={onSubmit} openModal={openModal} closeModal={closeModal} openModalState={openModalState} />
    </StyledShowContextBar>
  )
}
