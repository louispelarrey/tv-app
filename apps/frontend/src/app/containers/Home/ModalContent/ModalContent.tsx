import { Input } from "../../../components/Input/Input";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button/Button";
import { StyledForm, StyledModalContent } from "./ModalContent.style";

interface ModalContentProps {
  closeModal: () => void;
  onSubmit: (data: CreateShowData) => void;
}

export interface CreateShowData {
  name: string;
  description: string;
}

export const ModalContent = ({ closeModal, onSubmit }: ModalContentProps) => {
  const { register, handleSubmit } = useForm<CreateShowData>();

  return (
    <StyledModalContent>
      <button onClick={closeModal} id="close-button" data-testid="close-button">
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
