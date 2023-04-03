import styled from "styled-components";

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

const contentStyle = {
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

export { StyledAddShow, contentStyle };
