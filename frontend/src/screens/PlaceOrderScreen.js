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
      <section class="shopping-cart spad checkout-form">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="place-order">
                <h4>Shipping details</h4>
                <div class="order-total">
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
              <div class="place-order mt-5">
                <h4>Payment details</h4>
                <div class="order-total">
                  <p>
                    <strong>Method:</strong> {cart.paymentMethod}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <h4>Order Summary</h4>
              <div class="proceed-checkout">
                <ul>
                  <li class="subtotal">
                    Items <span>${cart.itemsPrice.toFixed(2)}</span>
                  </li>
                  <li class="subtotal">
                    Shipping <span>${cart.shippingPrice.toFixed(2)}</span>
                  </li>
                  <li class="subtotal">
                    Tax <span>${cart.taxPrice.toFixed(2)}</span>
                  </li>
                  <li class="cart-total">
                    Order Total <span>${cart.totalPrice.toFixed(2)}</span>
                  </li>
                </ul>
                <a
                  to="/"
                  class="proceed-btn"
                  type="button"
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </a>
              </div>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-lg-6">
              <h4>Order Items</h4>
              <div class="cart-table">
                <table>
                  <thead></thead>

                  <tbody>
                    {cart.cartItems.map((item) => (
                      <tr key={item.product}>
                        <td class="cart-pic ">
                          <img src={item.image} alt={item.name} />
                        </td>
                        <td class="cart-title text-center">
                          <Link to={`/product/${item.product}`}>
                            <h5>{item.name}</h5>
                          </Link>
                        </td>

                        <td class="total-price">${item.price * item.qty}</td>
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
