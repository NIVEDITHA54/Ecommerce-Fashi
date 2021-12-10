import React from "react";

function PartnerLogo() {
  return (
    <div className="partner-logo">
      <div className="container">
        <div className="logo-carousel owl-carousel owl-loaded">
          <div className="owl-stage-outer">
            <div
              className="owl-stage"
              style={{
                transform: "translate3d(0px, 0px, 0px)",
                transition: "all 0s ease 0s",
                width: "1170px",
              }}
            >
              <div
                className="owl-item active"
                style={{ width: "204px", marginRight: "30px" }}
              >
                <div className="logo-item">
                  <div className="tablecell-inner">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/logo-carousel/logo-1.png`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div
                className="owl-item active"
                style={{ width: "204px", marginRight: "30px" }}
              >
                <div className="logo-item">
                  <div className="tablecell-inner">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/logo-carousel/logo-2.png`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div
                className="owl-item active"
                style={{ width: "204px", marginRight: "30px" }}
              >
                <div className="logo-item">
                  <div className="tablecell-inner">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/logo-carousel/logo-3.png`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div
                className="owl-item active"
                style={{ width: "204px", marginRight: "30px" }}
              >
                <div className="logo-item">
                  <div className="tablecell-inner">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/logo-carousel/logo-4.png`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div
                className="owl-item active"
                style={{ width: "204px", marginRight: "30px" }}
              >
                <div className="logo-item">
                  <div className="tablecell-inner">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/logo-carousel/logo-5.png`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="owl-nav disabled">
            <button type="button" role="presentation" className="owl-prev">
              <i className="ti-angle-left"></i>
            </button>
            <button type="button" role="presentation" className="owl-next">
              <i className="ti-angle-right"></i>
            </button>
          </div>
          <div className="owl-dots disabled"></div>
        </div>
      </div>
    </div>
  );
}

export default PartnerLogo;
