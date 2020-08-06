import React from "react";

type Props = {
  name: string;
  onClick(): void;
};

const Button: React.FC<Props> = ({ name, onClick }) => {
  return (
    <button className="container" onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
