import React from 'react';
import { useRef } from 'react';

interface Prop {
  label: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
const CheckBox = (props: Prop) => {
  const inputRef = useRef(null);

  const onChange = () => {
    if (props.onChange) {
      props.onChange(inputRef.current!);
    }
  };

  return (
    <label className="custom-checkbox">
      <input type="checkbox" ref={inputRef} onChange={onChange} checked={props.checked} />
      <span className="custom-checkbox__checkmark">
        <i className="bx bx-check" />
      </span>
      {props.label}
    </label>
  );
};

export default CheckBox;
