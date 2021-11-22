import React from "react";
import Rating from "./Rating";

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} class="col-lg-4 col-sm-6">
      <div class="product-item">
        <div class="pi-pic">
          <img src={product.image} alt="" />

          <div class="icon">
            <i class="icon_heart_alt"></i>
          </div>
          <ul>
            <li class="w-icon active">
              <a href={`/product/${product._id}`}>
                <i class="icon_bag_alt"></i>
              </a>
            </li>
            <li class="quick-view">
              <a href={`/product/${product._id}`}>+ Quick View</a>
            </li>
            <li class="w-icon">
              <a href={`/product/${product._id}`}>
                <i class="fa fa-random"></i>
              </a>
            </li>
          </ul>
        </div>
        <div class="pi-text">
          <div class="catagory-name">{product.brand}</div>
          <a href={`/product/${product._id}`}>
            <h5>{product.name}</h5>
          </a>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
          <div class="product-price">${product.price}</div>
        </div>
      </div>
    </div>
  );
}
