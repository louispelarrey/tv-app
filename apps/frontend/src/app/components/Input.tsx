import React, { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

interface InputProps {
  type: string;
  placeholder?: string
  others?: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const StyleInput = styled.input`
  border: 1px solid #000;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
`;

export const Input: FC<InputProps> = ({ type, placeholder, ...others }) => {
  return (
    <StyleInput type={type} placeholder={placeholder} {...others}/>
  );
}
