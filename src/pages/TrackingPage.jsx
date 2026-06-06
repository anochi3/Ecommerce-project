import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Link } from 'react-router';
import axios from 'axios';
import './TrackingPage.css';
import dayjs from 'dayjs';


export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [ order, setOrder ] = useState(null);

  useEffect(() => {
    const getOrder = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    }
    getOrder();
  },[orderId]);

  if (!order){
    return null;
  }
  
  const currentProduct = order.products.find((product) => {
    return product.productId === productId;
  })
  
  const totalDeliveryTimeMs = currentProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  let timePassedPercentage = ( timePassedMs / totalDeliveryTimeMs ) * 100;
  if ( timePassedPercentage > 100 )
    timePassedPercentage = 100;

  const isPreparing = timePassedPercentage < 33;
  const isShipping = timePassedPercentage >= 33 && timePassedPercentage < 100;
  const isDelivered = timePassedPercentage === 100;

  

  return (
    <>
      {console.log(currentProduct)}
      {console.log(order)}
      <title>Tracking</title>
      <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />
      <Header cart={cart}/>

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {timePassedPercentage >= 100 ? "Delivered on ":"Arriving on "} {dayjs(currentProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {currentProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {currentProduct.quantity}
          </div>

          <img className="product-image" src={currentProduct.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && "current-status"}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipping && "current-status"}`}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered && "current-status"}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${timePassedPercentage}%` }}></div>
          </div>
        </div>
      </div>
    </>
  );
}