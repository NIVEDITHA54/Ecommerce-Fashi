import React from "react";
function Footer() {
  return (
    <footer class="footer-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-4">
            <div class="footer-left">
              <div class="footer-logo">
                <a href="/">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/footer-logo.png`}
                    alt=""
                  />
                </a>
              </div>
              <ul>
                <li>Address: 60-49 Road 11378 New York</li>
                <li>Phone: +65 11.188.888</li>
                <li>Email: fashi@gmail.com</li>
              </ul>
              <div class="footer-social">
                <a href="/">
                  <i class="fa fa-facebook"></i>
                </a>
                <a href="/backend">
                  <i class="fa fa-instagram"></i>
                </a>
                <a href="/">
                  <i class="fa fa-twitter"></i>
                </a>
                <a href="/">
                  <i class="fa fa-pinterest"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="footer-widget">
              <h5>Information</h5>
              <ul>
                <li>
                  <a href="/">About Us</a>
                </li>

                <li>
                  <a href="/">Contact</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-lg-5">
            <div class="newslatter-item">
              <h5>Join Our Newsletter Now</h5>
              <p>
                Get E-mail updates about our latest shop and special offers.
              </p>
              <form action="/" class="subscribe-form">
                <input type="text" placeholder="Enter Your Mail" />
                <button type="button">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="copyright-reserved">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="copyright-text">
                Copyright ©2021 All rights reserved
              </div>
              <div class="payment-pic">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/payment-method.png`}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
