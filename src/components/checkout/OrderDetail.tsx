import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { OrderResponse } from '../../interfaces/auth';
import { getOrder } from '../../services/order';
import { formatCurrency } from '../../utils/formatCurrency';
import Divider from '../common/Divider';
import ButtonDunk from './ButtonDunk';

const OrderDetail = () => {
  const { orderId } = useParams();
  const [orderDetail, setOrderDetail] = useState([] as any);
  const totalBill = orderDetail.reduce((total: any, i: { TotalPrice: any }) => {
    return total + i.TotalPrice;
  }, 0);
  useEffect(() => {
    const getOrderDetail = async () => {
      try {
        const res: OrderResponse = await getOrder(Number(orderId));
        setOrderDetail(res.Data);
      } catch (error) {
        throw error;
      }
    };
    getOrderDetail();
  }, [orderId]);

  return (
    <div className="container">
      <div className="order-detail">
        <div className="order-box">
          <div className="order-title">
            <i className="bx bx-check-circle" />
            <h1 className="order-h1">Thank You</h1>
            <p className="order-status">Success! Your order will be processed soon.</p>
          </div>
          <div className="order-info">
            <div className="order-user">
              <h4>Order</h4>
              <p>{orderDetail[0]?.BillingName}</p>
              <p>{orderDetail[0]?.BillingAddress}</p>
              <p>{orderDetail[0]?.BillingPhone}</p>
              <p>{orderDetail[0]?.BillingEmail}</p>
            </div>
            <div className="order-summary">
              <h4>Summary</h4>
              <p>
                <b>Order ID:</b> {orderId}
              </p>
              <p>
                <b>Order Date:</b> {moment(orderDetail?.DeliveryDate).format('MMM Do YY')}
              </p>
              <p>
                <b>Order Total:</b> {formatCurrency(totalBill)}
              </p>
            </div>
          </div>
          {/*<Divider />
           <div className="order-items">
            {orderDetail?.items.map((item, i) => (
              <OrderItem item={item} key={`item-order-${i}`} />
            ))}
          </div>
           */}
          <Divider />
          <div className="order-navigate">
            <Link to="/catalog">
              <ButtonDunk type="button" text="Continue shopping" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
