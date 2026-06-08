import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from "../../components/Header";
import { Link } from "react-router";
import { OrdersGrid } from './OrdersGrid';
import './OrdersPage.css';


export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getResponse = async () => {
      const response = await axios.get('/api/orders?expand=products');
      setOrders(response.data);
    }
    
    getResponse();
  }, [])

  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} loadCart={loadCart} />
      </div>
    </>
  );
}