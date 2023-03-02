import styled from "styled-components";

const StyleInput = styled.input`
  border: 1px solid #000;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  ${props => props.type === 'submit' && `
    display: inline-block;
    background-color: #007bff;
    color: #fff;
    border-color: #007bff;
    &:hover {
      background-color: #0069d9;
      border-color: #0062cc;
    }
    &:focus {
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
    &:active {
      background-color: #0062cc;
      border-color: #005cbf;
    }
  `}
`;

export { StyleInput };
