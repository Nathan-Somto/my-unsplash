import React from "react";

type Props = {
  children?: React.ReactNode;
  styles?: string;
  disabled?: boolean;
  type?: string;
  onClick?: () => void;
};

const Button = ({
  children,
  styles = "",
  disabled = false,
  type = "submit",
  onClick,
}: Props) => {
  return (
    <button className={"" + styles} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
