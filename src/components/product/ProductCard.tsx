import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';

interface ProductCardItem {
  image?: string;
  name?: string;
  price: number;
  id?: number;
}
const ProductCard = (props: ProductCardItem) => {
  return (
    <div className="product-card">
      <Link to={`/catalog/${props.id}`}>
        <div className="product-card__image">
          <img src={props.image} alt="" />
        </div>
        <div className="product-card__body">
          <h3 className="product-card__name">{props.name}</h3>
          <div className="product-card__price">Price: {formatCurrency(props.price)}</div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
