import React from "react";
function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="footer-left">
              <div className="footer-logo">
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
              <div className="footer-social">
                <a href="/">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="/backend">
                  <i className="fa fa-instagram"></i>
                </a>
                <a href="/">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="/">
                  <i className="fa fa-pinterest"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="footer-widget">
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

          <div className="col-lg-5">
            <div className="newslatter-item">
              <h5>Join Our Newsletter Now</h5>
              <p>
                Get E-mail updates about our latest shop and special offers.
              </p>
              <form action="/" className="subscribe-form">
                <input type="text" placeholder="Enter Your Mail" />
                <button type="button">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-reserved">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="copyright-text">
                Copyright ©2021 All rights reserved
              </div>
              <div className="payment-pic">
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
