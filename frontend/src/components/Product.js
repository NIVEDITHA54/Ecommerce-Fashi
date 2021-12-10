import React from "react";
import Rating from "./Rating";

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="col-lg-4 col-sm-6">
      <div className="product-item">
        <div className="pi-pic">
          <img src={product.image} alt="" />

          <div className="icon">
            <i className="icon_heart_alt"></i>
          </div>
          <ul>
            <li className="w-icon active">
              <a href={`/product/${product._id}`}>
                <i className="icon_bag_alt"></i>
              </a>
            </li>
            <li className="quick-view">
              <a href={`/product/${product._id}`}>+ Quick View</a>
            </li>
            <li className="w-icon">
              <a href={`/product/${product._id}`}>
                <i className="fa fa-random"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="pi-text">
          <div className="catagory-name">{product.brand}</div>
          <a href={`/product/${product._id}`}>
            <h5>{product.name}</h5>
          </a>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
          <div className="product-price">${product.price}</div>
        </div>
      </div>
    </div>
  );
}
