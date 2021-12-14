import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../actions/userActions";

function Header() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <header className="header-section">
      <div className="container">
        <div className="inner-header">
          <div className="row">
            <div className="col-lg-2 col-md-2">
              <div className="logo">
                <Link to="/">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-5">
              <div className="advanced-search">
                <div className="input-group">
                  <input type="text" placeholder="What do you need?" />
                  <button type="button">
                    <i className="ti-search"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6 text-right col-md-5">
              <ul className="nav-right">
                <li className="cart-icon">
                  <Link to="/cart">
                    <i className="icon_bag_alt"></i>
                    {cartItems.length > 0 && <span>{cartItems.length}</span>}
                  </Link>
                </li>

                {userInfo ? (
                  <li>
                    <Link to="/profile" className="login-panel">
                      <i className="fa fa-user p-2"></i>
                      {userInfo.name}
                    </Link>

                    <li>
                      <Link to="/orderhistory" className="login-panel">
                        <i class="fa fa-history p-2"></i>
                        Order History
                      </Link>
                    </li>

                    <Link
                      to="#signout"
                      className="login-panel"
                      onClick={signoutHandler}
                    >
                      <i className="fa fa-sign-out p-2"></i>Logout
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/signin" className="login-panel ml-2">
                      <i className="fa fa-sign-in p-2"></i>Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
