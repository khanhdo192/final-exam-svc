import React from 'react';
interface PolicyCardProp {
  name: string;
  icon: string;
}
const PolicyCard = (props: PolicyCardProp) => {
  return (
    <div className="policy-card">
      <div className="policy-card__icon">
        <i className={props.icon} />
      </div>
      <div className="policy-card__info">
        <div className="policy-card__info__name">{props.name}</div>
      </div>
    </div>
  );
};

export default PolicyCard;
