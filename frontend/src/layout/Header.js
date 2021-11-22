import React from "react";

function Header() {
  return (
    <header class="header-section">
      <div class="container">
        <div class="inner-header">
          <div class="row">
            <div class="col-lg-2 col-md-2">
              <div class="logo">
                <a href="/">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                    alt=""
                  />
                </a>
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
                  <a href="/">
                    <i class="icon_bag_alt"></i>
                    <span>3</span>
                  </a>
                </li>
                <li>
                  <a href="/" class="login-panel">
                    <i class="fa fa-user p-2"></i>Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
