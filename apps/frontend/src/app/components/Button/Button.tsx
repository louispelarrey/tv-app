import { FC } from "react";
import { StyledButton } from "./Button.style";

interface ButtonProps {
  children: string;
  type: "submit" | "button";
}

export const Button: FC<ButtonProps> = ({ children, type }) => {
  return (
    <StyledButton type={type}>{children}</StyledButton>
  );
};
