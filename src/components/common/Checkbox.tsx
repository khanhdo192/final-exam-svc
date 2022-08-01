import React, { useState } from 'react';
import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

interface Prop {
  label: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

const CheckBox = (props: Prop) => {
  const [capacityParams, setCapacityParams] = useSearchParams();
  const [query, setQuery] = useState(capacityParams.get('query' || ''));
  const capacityQuery = capacityParams.get('query') || '';

  const inputRef = useRef(null);

  const onChange = (event: any) => {
    if (props.onChange) {
      props.onChange(inputRef.current!);
    }
    // setQuery(props.label);
    setCapacityParams({ query: props.label });
    if (event.target.value) {
      setCapacityParams({ query: props.label });
    } else {
      setCapacityParams({});
    }
  };

  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        ref={inputRef}
        checked={props.checked}
        onChange={onChange}
        value={capacityQuery}
      />
      <span className="custom-checkbox__checkmark">
        <i className="bx bx-check" />
      </span>
      {props.label}
    </label>
  );
};

export default CheckBox;
