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
    <section className="checkout-section spad">
      <div className="container">
        <form className="checkout-form" onSubmit={submitHandler}>
          <div className="row">
            <div className="col-lg-12">
              <CheckoutSteps step1 step2 step3></CheckoutSteps>
            </div>
            <div className="col-lg-12 mt-5">
              <h4>Payment Method</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="place-order">
                <div className="order-total">
                  <div className="payment-check">
                    <div className="pc-item">
                      <label htmlFor="paypal">
                        Paypal
                        <input
                          type="checkbox"
                          id="paypal"
                          name="paymentMethod"
                          value="PayPal"
                          checked
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="pc-item">
                      <label for="stripe">
                        Stripe
                        <input
                          type="checkbox"
                          id="stripe"
                          name="paymentMethod"
                          value="Stripe"
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                  <div className="order-btn">
                    <button type="submit" className="site-btn register-btn">
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
