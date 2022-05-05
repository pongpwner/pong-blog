import React, { useEffect, useState } from "react";
import "./login.styles.scss";
//import jwt_decode from "jwt-decode";

const Login = ({ setCurrentUser, currentUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmitLogin(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    //window.location.href = "/";
    const data = await response.json();

    if (data.accesstoken) {
      // localStorage.setItem("token", data.user);
      alert("Login successful");

      //this line is problematiac set current user
      console.log(data.accesstoken);
      console.log(data.accesstoken.username);
      setCurrentUser({
        accesstoken: data.accesstoken,
        username: data.username,
      });
      // const token = jwt_decode(data.user);
      // console.log(token.username);
      // setCurrentUser(token.username);
      //window.location.href = "/";
    } else {
      alert("Please check your username and password");
    }
  }
  useEffect(() => {
    console.log();
  }, [currentUser]);
  return (
    <div className="login">
      <form
        className="login-form"
        //method="post"
        //action="/api/login"
        onSubmit={onSubmitLogin}
      >
        <h2 className="heading-2">Login</h2>
        <label className="form-label">User Name</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="text"
          placeholder="username"
          value={username}
        />
        <label className="form-label">Password</label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          className="text"
          placeholder="password"
          value={password}
        />
        <input
          type="submit"
          className="submit-button"
          value="Login"
          //onClick={() => document.forms[0].submit()}
        />
      </form>
    </div>
  );
};
export default Login;
{
  //   <form
  //   action="/register"
  //   className="register-form"
  //   method="post"
  //   onSubmit={(e) => onSubmitRegister(e)}
  // >
  //   <h2 className="heading-2">Register</h2>
  //   <label className="form-label">User Name</label>
  //   <input
  //     type="text"
  //     className="text"
  //     name="registerName"
  //     placeholder="username"
  //     value={registerName}
  //     onChange={(e) => {
  //       setRegisterName(e.target.value);
  //     }}
  //   />
  //   <label className="form-label">Password</label>
  //   <input
  //     type="password"
  //     className="text"
  //     name="registerPassword"
  //     placeholder="password"
  //     onChange={(e) => {
  //       setRegisterPassword(e.target.value);
  //     }}
  //   />
  //   <input
  //     type="button"
  //     className="submit-button"
  //     value="Submit"
  //     onClick={() => document.forms[1].submit()}
  //   />
  // </form>
}
