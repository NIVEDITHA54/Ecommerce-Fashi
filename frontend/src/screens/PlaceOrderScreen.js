import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <section className="shopping-cart spad checkout-form">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="place-order">
                <h4>Shipping details</h4>
                <div className="order-total">
                  <p>
                    <strong>Name:</strong> {cart.shippingAddress.fullName}{" "}
                    <br />
                    <strong>Address: </strong> {cart.shippingAddress.address},
                    {cart.shippingAddress.city},{" "}
                    {cart.shippingAddress.postalCode},
                    {cart.shippingAddress.country}
                  </p>
                </div>
              </div>
              <div className="place-order mt-5">
                <h4>Payment details</h4>
                <div className="order-total">
                  <p>
                    <strong>Method:</strong> {cart.paymentMethod}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h4>Order Summary</h4>
              <div className="proceed-checkout">
                <ul>
                  <li className="subtotal">
                    Items <span>${cart.itemsPrice.toFixed(2)}</span>
                  </li>
                  <li className="subtotal">
                    Shipping <span>${cart.shippingPrice.toFixed(2)}</span>
                  </li>
                  <li className="subtotal">
                    Tax <span>${cart.taxPrice.toFixed(2)}</span>
                  </li>
                  <li className="cart-total">
                    Order Total <span>${cart.totalPrice.toFixed(2)}</span>
                  </li>
                </ul>
                <a
                  className="proceed-btn"
                  type="button"
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </a>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-6">
              <h4>Order Items</h4>
              <div className="cart-table">
                <table>
                  <thead></thead>

                  <tbody>
                    {cart.cartItems.map((item) => (
                      <tr key={item.product}>
                        <td className="cart-pic ">
                          <img src={item.image} alt={item.name} />
                        </td>
                        <td className="cart-title text-center">
                          <Link to={`/product/${item.product}`}>
                            <h5>{item.name}</h5>
                          </Link>
                        </td>

                        <td className="total-price">
                          ${item.price * item.qty}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
