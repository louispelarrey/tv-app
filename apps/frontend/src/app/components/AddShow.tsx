import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal';
import { useState } from 'react';
import { CreateShowData, ModalContent } from './ModalContent';

interface AddShowProps {
  onSubmit: (data: CreateShowData) => void;
  openModal: () => void;
  closeModal: () => void;
  openModalState: boolean;
}

const StyledAddShow = styled.div`
  position: inherit;
  font-size: 2.1rem;
  :hover {
    cursor: pointer;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #2f374f;
  border-radius: 1rem;
  height: 3.5rem;
  padding: 0 1rem 0 1rem;
  border: 2px solid white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  color: white;
`;

export const contentStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    color: 'black',
    width: '60%',
    borderRadius: '1rem',
    border: '0.5px solid black',
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.75)',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

Modal.setAppElement('#root');

export const AddShow = ({onSubmit, openModal, closeModal, openModalState}: AddShowProps) => {
  return (
    <StyledAddShow>
      <div onClick={openModal}>
        <FontAwesomeIcon icon={faPlusCircle} />
      </div>

      <Modal
        isOpen={openModalState}
        onRequestClose={closeModal}
        style={contentStyle}
      >
        <ModalContent closeModal={closeModal} onSubmit={onSubmit} />
      </Modal>
    </StyledAddShow>
  )
}

