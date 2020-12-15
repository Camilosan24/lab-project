import React from "react";
import { Link } from "react-router-dom";
import "../styles/header-start.css";

const Header = (props) => {
  return (
    <div className="header-nav-dad">
      <div className="header-nav-children">
        <div id="header-name">Laboratorios</div>
        <div id="header-buttons">
          <Link to="/add-user">Agregar Usuario</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
