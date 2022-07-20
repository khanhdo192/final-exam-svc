import React from 'react';

interface Prop {
  title?: string;
  children?: React.ReactNode | JSX.Element[];
}
const Helmet = (props: Prop) => {
  document.title = 'Hungstore-' + props.title;
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="container">{props.children}</div>;
};

export default Helmet;
