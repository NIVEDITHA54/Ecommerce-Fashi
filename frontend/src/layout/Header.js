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
    <header class="header-section">
      <div class="container">
        <div class="inner-header">
          <div class="row">
            <div class="col-lg-2 col-md-2">
              <div class="logo">
                <Link to="/">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <div class="col-lg-5 col-md-5">
              <div class="advanced-search">
                <div class="input-group">
                  <input type="text" placeholder="What do you need?" />
                  <button type="button">
                    <i class="ti-search"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-lg-5 text-right col-md-5">
              <ul class="nav-right">
                <li class="cart-icon">
                  <Link to="/cart">
                    <i class="icon_bag_alt"></i>
                    {cartItems.length > 0 && <span>{cartItems.length}</span>}
                  </Link>
                </li>

                {userInfo ? (
                  <li>
                    <Link to="#" class="login-panel">
                      <i class="fa fa-user p-2"></i>
                      {userInfo.name}
                    </Link>

                    <Link
                      to="/signin"
                      class="login-panel"
                      onClick={signoutHandler}
                    >
                      <i class="fa fa-sign-out p-2"></i>Logout
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/signin" class="login-panel ml-2">
                      <i class="fa fa-sign-in p-2"></i>Login
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
