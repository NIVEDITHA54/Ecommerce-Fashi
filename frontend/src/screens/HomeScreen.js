import React, { useEffect } from "react";

import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <section class="product-shop spad">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 order-1 order-lg-2">
                <div class="product-show-option">
                  <div class="row">
                    <div class="col-lg-7 col-md-7">
                      <div class="select-option">
                        <select class="sorting" style={{ display: "none" }}>
                          <option value="">Default Sorting</option>
                        </select>
                        <div class="nice-select sorting" tabindex="0">
                          <span class="current">Default Sorting</span>
                          <ul class="list">
                            <li data-value="" class="option selected">
                              Default Sorting
                            </li>
                          </ul>
                        </div>
                        <select class="p-show" style={{ display: "none" }}>
                          <option value="">Show:</option>
                        </select>
                        <div class="nice-select p-show" tabindex="0">
                          <span class="current">Show:</span>
                          <ul class="list">
                            <li data-value="" class="option selected">
                              Show:
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-5 col-md-5 text-right">
                      <p>Show 01- 09 Of 36 Product</p>
                    </div>
                  </div>
                </div>
                <div class="product-list">
                  <div class="row">
                    <div className="row center">
                      {products.map((product) => (
                        <Product key={product._id} product={product}></Product>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
