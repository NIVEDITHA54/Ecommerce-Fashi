import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };
  return (
    <section class="checkout-section spad">
      <div class="container">
        <form class="checkout-form" onSubmit={submitHandler}>
          <div class="row">
            <div className="col-lg-12">
              <CheckoutSteps step1 step2></CheckoutSteps>
            </div>
            <div class="col-lg-12 mt-5">
              <h4>Payment Method</h4>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="place-order">
                <div class="order-total">
                  <div class="payment-check">
                    <div class="pc-item">
                      <label htmlFor="paypal">
                        Paypal
                        <input
                          type="checkbox"
                          id="paypal"
                          name="paymentMethod"
                          value="PayPal"
                          required
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span class="checkmark"></span>
                      </label>
                    </div>
                    <div class="pc-item">
                      <label for="stripe">
                        Stripe
                        <input
                          type="checkbox"
                          id="stripe"
                          name="paymentMethod"
                          value="Stripe"
                          required
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span class="checkmark"></span>
                      </label>
                    </div>
                  </div>
                  <div class="order-btn">
                    <button type="submit" class="site-btn register-btn">
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
