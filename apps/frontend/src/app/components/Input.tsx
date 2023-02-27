import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

interface InputProps {
  type: string;
  placeholder?: string
  name?: string
  others?: any;
  register?: any;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

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

export const Input: FC<InputProps> = ({ type, placeholder, name, register, value, ...others }) => {
  return (
    <StyleInput type={type} placeholder={placeholder} name={name} value={value} {...register} {...others}/>
  );
}
