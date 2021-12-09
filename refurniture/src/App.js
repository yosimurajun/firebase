import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductList } from "./features/product/ProductList";
import { AddPostForm } from "./features/post/AddPostForm";
import { SinglePostPage } from "./features/post/SinglePostPage";
import { EditPostForm } from "./features/post/EditPostForm";

import { Navbar } from "./app/Navbar";

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
        {/* <Route exact path="/posts/:postId" element={<SinglePostPage />} /> */}
        {/* <Route exact path="/edit/:postId" element={<EditPostForm />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
