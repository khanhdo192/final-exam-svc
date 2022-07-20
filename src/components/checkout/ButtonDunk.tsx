import React from 'react';

type ButtonProps = {
  type?: 'submit' | 'reset' | 'button';
  text: string;
  onClick?: () => void;
};

const ButtonDunk = ({ type, text, onClick }: ButtonProps) => {
  return (
    <button type={type} className="btn-dunk" onClick={onClick}>
      {text}
    </button>
  );
};

export default ButtonDunk;
