import { Input } from "../../components/Input/Input";
import styled from "styled-components";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Button/Button";

interface ModalContentProps {
  closeModal: () => void;
  onSubmit: (data: CreateShowData) => void;
}

export interface CreateShowData {
  name: string;
  description: string;
}

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

export const ModalContent = ({ closeModal, onSubmit }: ModalContentProps) => {
  const { register, handleSubmit } = useForm<CreateShowData>();

  return (
    <StyledModalContent>
      <button onClick={closeModal} id="close-button">
        <FontAwesomeIcon icon={faClose} />
      </button>
      <h2>Ajouter une série</h2>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <label>
          Nom:
          <Input type="text" name="name" register={register("name")}/>
        </label>
        <label>
          Description:
          <Input type="text" name="description" register={register("description")} />
        </label>
        <Button type="submit">Envoyer</Button>
      </StyledForm>
    </StyledModalContent>
  )
}
