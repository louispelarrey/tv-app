import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal';
import { CreateShowData, ModalContent } from '../ModalContent/ModalContent';
import { contentStyle, StyledAddShow } from './AddShow.style';

interface AddShowProps {
  onSubmit: (data: CreateShowData) => void;
  openModal: () => void;
  closeModal: () => void;
  openModalState: boolean;
}

Modal.setAppElement('#root');

export const AddShow = ({onSubmit, openModal, closeModal, openModalState}: AddShowProps) => {
  return (
    <StyledAddShow>
      <div onClick={openModal}>
        <FontAwesomeIcon icon={faPlusCircle} data-cy="create-show-button"/>
      </div>


      <Modal
        isOpen={openModalState}
        onRequestClose={closeModal}
        style={contentStyle}
        id="create-show-modal"
      >
        <ModalContent closeModal={closeModal} onSubmit={onSubmit} />
      </Modal>
    </StyledAddShow>
  )
}

