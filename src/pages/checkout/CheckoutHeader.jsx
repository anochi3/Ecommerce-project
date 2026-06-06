import { Link } from 'react-router';
import './CheckoutHeader.css';
import Logo from '/src/assets/images/logo.png';
import MobileLogo from '/src/assets/images/mobile-logo.png';

export function CheckoutHeader({ cart }) {
  
  function getTotalCartQuantity(){
    const totalquantity = cart.reduce((acc, item) => {
      return acc + item.quantity;
    },0)
    return totalquantity;
  }

  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src={ Logo } />
              <img className="mobile-logo" src={ MobileLogo } />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<Link className="return-to-home-link"
              to="/">{getTotalCartQuantity()} Items</Link>)
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>
    </>
  )
}