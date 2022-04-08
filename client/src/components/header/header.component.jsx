import React, { useState, useEffect } from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";

const Header = () => (
  <div className="header">
    <nav className="navi">
      <ul className="navi-list">
        <li className="navi-list-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navi-list-item">
          <Link to="/compose">Compose</Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Header;
