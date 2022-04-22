import React, { useEffect, useState } from "react";
import "./login.styles.scss";

const Login = ({ setCurrentUser }) => {
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  async function onSubmitLogin(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginName,
        loginPassword,
      }),
    });
    //window.location.href = "/";
    const data = await response.json();

    if (data.user) {
      localStorage.setItem("token1", data.user);
      alert("Login successful");
      console.log(data.user);
      setCurrentUser(data.user);
      window.location.href = "/";
    } else {
      alert("Please check your username and password");
    }
  }

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
          onChange={(e) => setLoginName(e.target.value)}
          type="text"
          className="text"
          placeholder="username"
          value={loginName}
        />
        <label className="form-label">Password</label>
        <input
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
          type="password"
          className="text"
          placeholder="password"
          value={loginPassword}
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
