import "./App.css";
import React, { useState, useEffect } from "react";
import Compose from "./pages/compose/compose.component";
import HomePage from "./pages/home-page/home-page.component";
import FullPost from "./pages/full-post/full-post.component";
import Header from "./components/header/header.component";
import Login from "./pages/login/login.component";
import Register from "./pages/register/register.component";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//"proxy": "http://localhost:5000",      in pcak.json
export const UserContext = React.createContext([]);
const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [backendData, setBackendData] = useState(null);
  const [loading, setLoading] = useState(true);

  // First thing, check if a refreshtoken exist
  useEffect(() => {
    async function checkRefreshToken() {
      const result = await (
        await fetch("http://localhost:5000/api/refresh-token", {
          method: "POST",
          credentials: "include", // Needed to include the cookie

          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
      setCurrentUser({
        accesstoken: result.accesstoken,
        username: result.username,
      });
      setLoading(false);
    }
    checkRefreshToken();
  }, []);

  //if (loading) return <div>Loading ...</div>;
  return (
    <BrowserRouter>
      <div className="App">
        <UserContext.Provider value={[currentUser, setCurrentUser]}>
          <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />

          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  backendData={backendData}
                  setBackendData={setBackendData}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route path="/compose" element={<Compose />} />
            <Route path={`/posts/:id`} element={<FullPost />} />
            <Route
              path="/login"
              element={
                <Login
                  setCurrentUser={setCurrentUser}
                  currentUser={currentUser}
                />
              }
            />
            <Route path="register" element={<Register />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
};

export default App;
