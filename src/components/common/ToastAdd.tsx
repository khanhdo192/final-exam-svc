import React from 'react';
import { Link } from 'react-router-dom';
import ButtonDunk from '../checkout/ButtonDunk';

type Props = {
  children: React.ReactNode;
  link: string;
  text: string;
};

const ToastAdd = (props: Props) => {
  return (
    <div>
      <p>{props.children} have been added to your cart</p>
      <Link to={props.link}>
        <ButtonDunk type="button" text={props.text} />
      </Link>
    </div>
  );
};

export default ToastAdd;
