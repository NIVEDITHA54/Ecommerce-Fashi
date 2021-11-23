import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  console.log(productId);
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };
  return (
    <>
      <h3 className="text-center">Shopping Cart</h3>
      {cartItems.length === 0 ? (
        <MessageBox>
          Cart is empty. <Link to="/">Go Shopping</Link>
        </MessageBox>
      ) : (
        <section class="shopping-cart spad">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="cart-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th class="p-name">Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.product}>
                          <td class="cart-pic first-row">
                            <img src={item.image} alt={item.name} />
                          </td>
                          <td class="cart-title first-row">
                            <Link to={`/product/${item.product}`}>
                              <h5>{item.name}</h5>
                            </Link>
                          </td>
                          <td class="p-price first-row">${item.price}</td>
                          <td class="qua-col first-row">
                            <div class="quantity">
                              <div class="pro-qty">
                                <select
                                  value={item.qty}
                                  onChange={(e) =>
                                    dispatch(
                                      addToCart(
                                        item.product,
                                        Number(e.target.value)
                                      )
                                    )
                                  }
                                >
                                  {[...Array(item.countInStock).keys()].map(
                                    (x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>
                            </div>
                          </td>
                          <td class="total-price first-row">
                            ${item.price * item.qty}
                          </td>
                          <td class="close-td first-row">
                            <i
                              class="ti-close"
                              onClick={() =>
                                removeFromCartHandler(item.product)
                              }
                            ></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div class="row">
                  <div class="col-lg-4">
                    <div class="cart-buttons">
                      <Link to="/" class="primary-btn continue-shop">
                        Continue shopping
                      </Link>
                    </div>
                    <div class="discount-coupon">
                      <h6>Discount Codes</h6>
                      <form action="#" class="coupon-form">
                        <input type="text" placeholder="Enter your codes" />
                        <button type="submit" class="site-btn coupon-btn">
                          Apply
                        </button>
                      </form>
                    </div>
                  </div>
                  <div class="col-lg-4 offset-lg-4">
                    <div class="proceed-checkout">
                      <ul>
                        <li class="subtotal">
                          Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)}{" "}
                          items) :{" "}
                          <span>
                            $
                            {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                          </span>
                        </li>
                        <li class="cart-total">
                          Total ({cartItems.reduce((a, c) => a + c.qty, 0)}{" "}
                          items) :{" "}
                          <span>
                            $
                            {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                          </span>
                        </li>
                      </ul>
                      <a
                        class="proceed-btn"
                        onClick={checkoutHandler}
                        disabled={cartItems.length === 0}
                      >
                        PROCEED TO CHECK OUT
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
