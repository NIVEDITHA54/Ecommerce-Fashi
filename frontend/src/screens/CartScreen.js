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
    <section className="shopping-cart spad">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="text-center">Shopping Cart</h2>
          </div>
        </div>
        {cartItems.length === 0 ? (
          <div className="row mt-5">
            <div className="col-sm-12">
              <MessageBox>
                Cart is empty. <Link to="/">Go Shopping</Link>
              </MessageBox>
            </div>
          </div>
        ) : (
          <div className="row mt-5">
            <div className="col-lg-12">
              <div className="cart-table">
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th className="p-name">Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.product}>
                        <td className="cart-pic first-row">
                          <img src={item.image} alt={item.name} />
                        </td>
                        <td className="cart-title first-row">
                          <Link to={`/product/${item.product}`}>
                            <h5>{item.name}</h5>
                          </Link>
                        </td>
                        <td className="p-price first-row">${item.price}</td>
                        <td className="qua-col first-row">
                          <div className="quantity">
                            <div className="pro-qty">
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
                        <td className="total-price first-row">
                          ${item.price * item.qty}
                        </td>
                        <td className="close-td first-row">
                          <i
                            className="ti-close"
                            onClick={() => removeFromCartHandler(item.product)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="cart-buttons">
                    <Link to="/" className="primary-btn continue-shop">
                      Continue shopping
                    </Link>
                  </div>
                  <div className="discount-coupon">
                    <h6>Discount Codes</h6>
                    <form action="#" className="coupon-form">
                      <input type="text" placeholder="Enter your codes" />
                      <button type="submit" className="site-btn coupon-btn">
                        Apply
                      </button>
                    </form>
                  </div>
                </div>
                <div className="col-lg-4 offset-lg-4">
                  <div className="proceed-checkout">
                    <ul>
                      <li className="subtotal">
                        Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)}{" "}
                        items) :{" "}
                        <span>
                          ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                        </span>
                      </li>
                      <li className="cart-total">
                        Total ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
                        :{" "}
                        <span>
                          ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                        </span>
                      </li>
                    </ul>
                    <ul>
                      <div className="col-sm-12">
                        <button
                          className="btn proceed-btn btn-block"
                          onClick={checkoutHandler}
                          disabled={cartItems.length === 0}
                        >
                          PROCEED TO CHECK OUT
                        </button>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
