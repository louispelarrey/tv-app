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
`;

export const Input: FC<InputProps> = ({ type, placeholder, name, register, value, ...others }) => {
  return (
    <StyleInput type={type} placeholder={placeholder} name={name} value={value} {...register} {...others}/>
  );
}
