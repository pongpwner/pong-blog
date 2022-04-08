import "./App.css";
import React, { useState, useEffect } from "react";
import Compose from "./pages/compose/compose.component";
import HomePage from "./pages/home-page/home-page.component";
import FullPost from "./pages/full-post/full-post.component";
import Header from "./components/header/header.component";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/compose" element={<Compose />} />
          <Route path={`/posts/:id`} element={<FullPost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
