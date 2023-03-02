import { ChangeEvent, FC } from 'react';
import { StyleInput } from './Input.style';

interface InputProps {
  type: string;
  placeholder?: string
  name?: string
  others?: any;
  register?: any;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = ({ type, placeholder, name, register, value, ...others }) => {
  return (
    <StyleInput type={type} placeholder={placeholder} name={name} value={value} {...register} {...others}/>
  );
}
