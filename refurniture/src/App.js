import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductList } from "./features/product/ProductList";
// import { AddPostForm } from "./features/post/AddPostForm";
// import { SinglePostPage } from "./features/post/SinglePostPage";
// import { EditPostForm } from "./features/post/EditPostForm";

import { Navbar } from "./app/Navbar";
import { Cart } from "./features/cart/Cart";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ProductList />
            </>
          }
        />
        <Route exact path="/cart" element={<Cart />} />
        {/* <Route exact path="/edit/:postId" element={<EditPostForm />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
