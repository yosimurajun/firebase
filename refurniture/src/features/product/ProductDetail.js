import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const ProductDetail = ({ product, onNumber, onCart }) => {
  return (
    <div className="productDetail">
      <div className="product_card">
        <div className="card_section card_header">
          <img className="card_img" src={product.thumnail} alt="" />
          <div className="detail_content">
            <h4>{product.title}</h4>
            <div className="content_texts font-smallerSize">
              <span>Price</span>
              <span>${product.price}</span>
            </div>
            <div className="content_texts font-smallerSize">
              <span>Size</span>
              <span>{product.size}</span>
            </div>
            <div className="content_texts font-smallerSize">
              <span>Color</span>
              <span>{product.color}</span>
            </div>
          </div>
        </div>
        <div className="card_section card_order">
          <select onChange={onNumber}>
            {Array.apply(null, { length: product.numbers }).map((e, i) => (
              <option value={i + 1}>{i + 1}</option>
            ))}
            {/* <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option> */}
          </select>
          <button className="color-blue" onClick={onCart}>
            Add to cart
          </button>
        </div>
        <div className="card_section card_gallery">
          <Carousel>
            {product.images.map((image, index) => (
              <div>
                <img
                  key={index}
                  className="gallery_img"
                  src={image}
                  alt={product.title}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};
