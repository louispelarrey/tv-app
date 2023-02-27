import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

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

export const AddShow = () => {
  return (
    <StyledAddShow>
      <FontAwesomeIcon icon={faPlusCircle} />
    </StyledAddShow>
  )
}
