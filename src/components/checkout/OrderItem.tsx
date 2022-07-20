import { IProductsCart } from '../../interfaces/ProductItem';
import { formatCurrency } from '../../utils/formatCurrency';

interface ICartItemDetail {
  item: IProductsCart;
}

const OrderItem = (props: ICartItemDetail) => {
  return (
    <div className="checkout__order-item">
      <div className="item-wrapper">
        <img className="item-img" src={props.item.Products.Images[0].Link} alt="" />
        <span className="item-quantity">{props.item.Quantity}</span>
      </div>
      <div className="item-info">
        <p className="item-name">{props.item.Products.Name}</p>
        <p className="item-types">
          {props.item.Products.Color.Name} - {props.item.Products.Capacity.Name}
        </p>
      </div>
      <div className="item-value">
        <p className="item-price">{formatCurrency(props.item.Products.Price)}</p>
      </div>
    </div>
  );
};

export default OrderItem;
