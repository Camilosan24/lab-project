import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div className="header-nav-dad">
      <div className="header-nav-children">
        <button className="burger-button"></button>
        <div id="header-name">
          <span>Laboratorios</span>
        </div>
        <div id="header-buttons">
          <div className="button">
            <Link to="/add-user">Agregar Usuario</Link>
          </div>
          <div className="button">
            <Link to="/add-user">Ver Reporte</Link>
          </div>
          <div className="button">
            <Link to="/add-user">Buscar Usuario</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
