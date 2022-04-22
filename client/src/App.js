import "./App.css";
import React, { useState, useEffect } from "react";
import Compose from "./pages/compose/compose.component";
import HomePage from "./pages/home-page/home-page.component";
import FullPost from "./pages/full-post/full-post.component";
import Header from "./components/header/header.component";
import Login from "./pages/login/login.component";
import Register from "./pages/register/register.component";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <BrowserRouter>
      <div className="App">
        <Header currentUser={currentUser} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/compose" element={<Compose />} />
          <Route path={`/posts/:id`} element={<FullPost />} />
          <Route
            path="/login"
            element={<Login setCurrentUser={setCurrentUser} />}
          />
          <Route path="register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
