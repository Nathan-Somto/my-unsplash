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
    <button className={"bg-black text-white py-3 mt-4 rounded-md " + styles} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
