import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder, payOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const dispatch = useDispatch();

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <section class="shopping-cart spad checkout-form">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="place-order">
                <h4>Order {order._id}</h4>
                <div class="order-total">
                  <p>
                    <strong>Name:</strong> {cart.shippingAddress.fullName}{" "}
                    <br />
                    <strong>Address: </strong> {cart.shippingAddress.address},
                    {cart.shippingAddress.city},{" "}
                    {cart.shippingAddress.postalCode},
                    {cart.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <MessageBox variant="success">
                      Delivered at {order.deliveredAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not Delivered</MessageBox>
                  )}
                </div>
              </div>
              <div class="place-order mt-5">
                <h4>Payment details</h4>
                <div class="order-total">
                  <p>
                    <strong>Method:</strong> {cart.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <MessageBox variant="success">
                      Paid at {order.paidAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not Paid</MessageBox>
                  )}
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
                {!order.isPaid && (
                  <li>
                    {!sdkReady ? (
                      <LoadingBox></LoadingBox>
                    ) : (
                      <>
                        {errorPay && (
                          <MessageBox variant="danger">{errorPay}</MessageBox>
                        )}
                        {loadingPay && <LoadingBox></LoadingBox>}

                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        ></PayPalButton>
                      </>
                    )}
                  </li>
                )}
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
