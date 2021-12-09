import React, { useState } from "react";
import "./ProductList.css";
import { ProductDetail } from "./ProductDetail";

const fakeData = [
  {
    type: "table",
    id: "1",
    title: "1",
    price: "12.00",
    size: "three",
    color: "blue, red, green",
    images: [
      "https://images.unsplash.com/photo-1529113241001-b495badd8d44?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHRhYmxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHRhYmxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60",
      "https://images.unsplash.com/photo-1554743096-a4afca389293?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHRhYmxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60",
    ],
  },
  {
    type: "table",
    id: "2",
    title: "2",
    price: "12.00",
    size: "two",
    color: "red, green",
    images: ["1", "2", "3"],
  },
  {
    type: "table",
    id: "3",
    title: "13",
    price: "20.00",
    size: "four",
    color: "red, yellow",
    images: ["1", "2", "3"],
  },
  {
    type: "table",
    id: "4",
    title: "4",
    price: "12.00",
    size: "two",
    color: "red, green",
  },
  {
    type: "sofas",
    id: "5",
    title: "5",
    price: "5.00",
    size: "none",
    color: "red, yellow",
  },
  {
    type: "sofas",
    id: "6",
    title: "6",
  },
  {
    type: "sofas",
    id: "7",
    title: "6",
    price: "20.00",
    size: "four",
    color: "red, yellow",
  },
  {
    type: "chairs",
    id: "8",
    title: "6",
    price: "5.00",
    size: "none",
    color: "red, yellow",
  },
  {
    type: "chairs",
    id: "9",
    title: "6",
    price: "5.00",
    size: "none",
    color: "red, yellow",
  },
  {
    type: "wardrobes",
    id: "10",
    title: "6",
    price: "5.00",
    size: "none",
    color: "red, yellow",
  },
  {
    type: "wardrobes",
    id: "11",
    title: "6",
    price: "10.00",
    size: "one",
    color: "green",
  },
  {
    type: "wardrobes",
    id: "12",
    title: "6",
    price: "12.00",
    size: "two",
    color: "red, green",
  },
];

const SortNav = ({ onClick, active }) => {
  return (
    <ul className="sort_nav">
      <li
        className={
          active === "Table"
            ? "sort_li font-smallerSize color-white color-background"
            : "sort_li font-smallerSize color-blue"
        }
        onClick={onClick}
      >
        Table
      </li>
      <li
        className={
          active === "Sofas"
            ? "sort_li font-smallerSize color-white color-background"
            : "sort_li font-smallerSize color-blue"
        }
        onClick={onClick}
      >
        Sofas
      </li>
      <li
        className={
          active === "Chairs"
            ? "sort_li font-smallerSize color-white color-background"
            : "sort_li font-smallerSize color-blue"
        }
        onClick={onClick}
      >
        Chairs
      </li>
      <li
        className={
          active === "Wardrobes"
            ? "sort_li font-smallerSize color-white color-background"
            : "sort_li font-smallerSize color-blue"
        }
        onClick={onClick}
      >
        Wardrobes
      </li>
    </ul>
  );
};

export const ProductList = () => {
  const [active, setActive] = useState("Table");
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);

  const onClickActive = (e) => {
    setActive(e.target.innerText);
  };

  const onClickedProduct = (id) => {
    const selectedProduct = fakeData.find((data) => data.id === id);
    setSelectedItem(selectedProduct);
    setModal(true);
  };
  return (
    <section className="productList font-midSize">
      <div className="productList_hedaer">
        <h2>Shop</h2>
        <SortNav onClick={onClickActive} active={active} />
      </div>
      <div className="products">
        {fakeData
          .filter((item) => item.type === active.toLowerCase())
          .map((item) => (
            <div
              className="item"
              onClick={() => onClickedProduct(item.id)}
            ></div>
          ))}
      </div>
      {modal && <ProductDetail product={selectedItem} />}
    </section>
  );
};
