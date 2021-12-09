import React from "react";
export const ProductDetail = ({ product }) => {
  const onClick = () => {};
  return (
    <div className="productDetail">
      <div className="product_card">
        <div className="card_section card_header">
          <img className="card_img" src="" alt="" />
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
          <select>
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
          </select>
          <button className="color-blue">Add to cart</button>
        </div>
        <div className="card_section card_gallery">
          {product.images.map((image) => (
            <div>
              <img className="gallery_img" src={image} alt={product.title} />
            </div>
          ))}

          <span className="prev">L</span>
          <span className="next">R</span>
        </div>
      </div>
    </div>
  );
};
