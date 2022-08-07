import React, {Fragment} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addItemsToCart } from '../../actions/cartAction';
import './Cart.css'
import CartItemCard from "./CartItemCard";

const Cart = () => {

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (quantity <= 1) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const checkoutHandler = () => {}

  return (
    <Fragment>
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>

        {cartItems && cartItems.map((item, index) => (
          <div className="cartContainer" key={index}>
          <CartItemCard item={item} />
          <div className="cartInput">
            <button onClick={() => decreaseQuantity(item.product, item.quantity)}>
              -
            </button>
            <input type="number" value={item.quantity} readOnly />
            <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>
              +
            </button>
          </div>
          <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
         </div>
        ))}
        <div className="cartGrossProfit">
          <div></div>
          <div className="cartGrossProfitBox">
            <p>Gross Total</p>
            <p>{`₹${cartItems.reduce(
              (acc, item) => acc + item.quantity * item.price,
              0
            )}`}</p>
          </div>
          <div></div>
          <div className="checkOutBtn">
            <button onClick={checkoutHandler}>Check Out</button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Cart