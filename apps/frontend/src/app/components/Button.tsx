import { FC } from "react";
import styled from "styled-components";

interface ButtonProps {
  children: string;
  type: "submit" | "button";
}


const StyledButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #8393ed;
  color: white;
  border: none;
  cursor: pointer;
  display: inline-block;

`;

export const Button: FC<ButtonProps> = ({ children, type }) => {
  return (
    <StyledButton type={type}>{children}</StyledButton>
  );
};
