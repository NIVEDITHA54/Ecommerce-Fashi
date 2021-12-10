import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="breacrumb-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-text product-more">
                    <a href="/">
                      <i className="fa fa-home"></i> Back to Homepage
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="product-shop spad page-details">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-6">
                      <div
                        className="product-pic-zoom"
                        style={{ position: "relative", overflow: "hidden" }}
                      >
                        <img
                          className="product-big-img"
                          src={product.image}
                          alt=""
                        />
                        <div className="zoom-icon">
                          <i className="fa fa-search-plus"></i>
                        </div>
                        <img
                          role="presentation"
                          alt=""
                          src={product.image}
                          className="zoomImg"
                          style={{
                            position: "absolute",
                            top: "-41.3333px",
                            left: "-105.667px",
                            opacity: "0",
                            width: "440px",
                            height: "520px",
                            border: "none",
                            maxWidth: "none",
                            maxHeight: "none",
                          }}
                        />
                      </div>
                      <div className="product-thumbs"></div>
                    </div>

                    <div className="col-lg-6">
                      <div className="product-details">
                        <div className="pd-title">
                          <span>{product.brand}</span>
                          <h3>{product.name}</h3>
                          <a href="/" className="heart-icon">
                            <i className="icon_heart_alt"></i>
                          </a>
                        </div>

                        <Rating
                          rating={product.rating}
                          numReviews={product.numReviews}
                        ></Rating>

                        <div className="pd-desc">
                          <p>{product.description}</p>
                          <h4>${product.price}</h4>
                        </div>
                        <div className="pd-color">
                          <h6>Color</h6>
                          <div className="pd-color-choose">
                            <div className="cc-item">
                              <input type="radio" id="cc-black" />
                              <label htmlFor="cc-black"></label>
                            </div>
                            <div className="cc-item">
                              <input type="radio" id="cc-yellow" />
                              <label
                                htmlFor="cc-yellow"
                                className="cc-yellow"
                              ></label>
                            </div>
                            <div className="cc-item">
                              <input type="radio" id="cc-violet" />
                              <label
                                htmlFor="cc-violet"
                                className="cc-violet"
                              ></label>
                            </div>
                          </div>
                        </div>
                        <div className="pd-size-choose">
                          <div className="sc-item">
                            <input type="radio" id="sm-size" />
                            <label htmlFor="sm-size">s</label>
                          </div>
                          <div className="sc-item">
                            <input type="radio" id="md-size" />
                            <label htmlFor="md-size">m</label>
                          </div>
                          <div className="sc-item">
                            <input type="radio" id="lg-size" />
                            <label htmlFor="lg-size">l</label>
                          </div>
                          <div className="sc-item">
                            <input type="radio" id="xl-size" />
                            <label htmlFor="xl-size">xs</label>
                          </div>
                        </div>

                        <ul className="pd-tags">
                          <li>
                            <span>Seller</span>: {product.brand}
                          </li>
                          <li>
                            <span>CATEGORY</span>: {product.category}
                          </li>
                          <li>
                            <span>Status</span>:{" "}
                            {product.countInStock > 0 ? (
                              <span className="success">In Stock</span>
                            ) : (
                              <span className="danger">Unavailable</span>
                            )}
                          </li>
                          <li>
                            <span>Qty</span>:
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </li>
                        </ul>
                        {product.countInStock > 0 ? (
                          <div className="quantity">
                            <button
                              onClick={addToCartHandler}
                              className="btn primary-btn pd-cart"
                              style={{ color: "#ffffff" }}
                              type="button"
                            >
                              Add To Cart
                            </button>
                          </div>
                        ) : (
                          <div className="quantity">
                            <span className="danger">
                              Currently the product is not in stock.We will
                              notify you once it is available.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
