import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
          <div class="breacrumb-section">
            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <div class="breadcrumb-text product-more">
                    <a href="/">
                      <i class="fa fa-home"></i> Back to Homepage
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section class="product-shop spad page-details">
            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <div class="row">
                    <div class="col-lg-6">
                      <div
                        class="product-pic-zoom"
                        style={{ position: "relative", overflow: "hidden" }}
                      >
                        <img
                          class="product-big-img"
                          src={product.image}
                          alt=""
                        />
                        <div class="zoom-icon">
                          <i class="fa fa-search-plus"></i>
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
                            width: "440px;",
                            height: "520px;",
                            border: "none",
                            maxWidth: "none",
                            maxHeight: "none",
                          }}
                        />
                      </div>
                      <div class="product-thumbs"></div>
                    </div>

                    <div class="col-lg-6">
                      <div class="product-details">
                        <div class="pd-title">
                          <span>{product.brand}</span>
                          <h3>{product.name}</h3>
                          <a href="#" class="heart-icon">
                            <i class="icon_heart_alt"></i>
                          </a>
                        </div>

                        <Rating
                          rating={product.rating}
                          numReviews={product.numReviews}
                        ></Rating>

                        <div class="pd-desc">
                          <p>{product.description}</p>
                          <h4>${product.price}</h4>
                        </div>
                        <div class="pd-color">
                          <h6>Color</h6>
                          <div class="pd-color-choose">
                            <div class="cc-item">
                              <input type="radio" id="cc-black" />
                              <label for="cc-black"></label>
                            </div>
                            <div class="cc-item">
                              <input type="radio" id="cc-yellow" />
                              <label for="cc-yellow" class="cc-yellow"></label>
                            </div>
                            <div class="cc-item">
                              <input type="radio" id="cc-violet" />
                              <label for="cc-violet" class="cc-violet"></label>
                            </div>
                          </div>
                        </div>
                        <div class="pd-size-choose">
                          <div class="sc-item">
                            <input type="radio" id="sm-size" />
                            <label for="sm-size">s</label>
                          </div>
                          <div class="sc-item">
                            <input type="radio" id="md-size" />
                            <label for="md-size">m</label>
                          </div>
                          <div class="sc-item">
                            <input type="radio" id="lg-size" />
                            <label for="lg-size">l</label>
                          </div>
                          <div class="sc-item">
                            <input type="radio" id="xl-size" />
                            <label for="xl-size">xs</label>
                          </div>
                        </div>

                        <ul class="pd-tags">
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
                          <div class="quantity">
                            <a
                              onClick={addToCartHandler}
                              class="primary-btn pd-cart"
                              style={{ color: "#ffffff" }}
                            >
                              Add To Cart
                            </a>
                          </div>
                        ) : (
                          <div class="quantity">
                            <span class="danger">
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
