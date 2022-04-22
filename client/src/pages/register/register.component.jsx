import React, { useEffect, useState } from "react";
import "./register.styles.scss";

const Register = () => {
  const [registerName, setRegisterName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  async function onSubmitRegister(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        registerName: registerName,
        registerPassword: registerPassword,
      }),
    });
    const data = await response.json();

    if (data.status === "ok") {
      alert("registered");
      window.location.href = "/login";
    }
  }
  return (
    <div className="register">
      <form className="register-form" onSubmit={(e) => onSubmitRegister(e)}>
        <h2 className="heading-2">Register</h2>
        <label className="form-label">User Name</label>
        <input
          type="text"
          className="text"
          placeholder="username"
          value={registerName}
          onChange={(e) => {
            setRegisterName(e.target.value);
          }}
        />
        <label className="form-label">Password</label>
        <input
          type="password"
          className="text"
          placeholder="password"
          onChange={(e) => {
            setRegisterPassword(e.target.value);
          }}
        />
        <input type="submit" className="submit-button" value="Register" />
      </form>
    </div>
  );
};

export default Register;
