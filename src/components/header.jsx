import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [burger, setBurger] = useState(false);

  return (
    <React.Fragment>
      {window.screen.width < 420 ? (
        <Link className="burger-button">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="bars"
            className="svg-inline--fa fa-bars fa-w-14"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            height="30"
            width="30"
            onClick={() => setBurger(!burger)}
            to=""
          >
            <path
              fill="currentColor"
              d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
            ></path>
          </svg>
        </Link>
      ) : (
        ""
      )}

      {burger || window.screen.width > 420 ? (
        <div className="header-nav-dad">
          <div className="header-nav-children">
            <div id="header-name">
              <span>Laboratorios</span>
            </div>
            <div id="center-div"></div>
            <div id="header-buttons">
              <div className="button-box">
                <div className="button">
                  <Link to="/add-user">Agregar Usuario</Link>
                </div>
              </div>
              <div className="button-box">
                <div className="button">
                  <Link to="/add-user">Ver Reporte</Link>
                </div>
              </div>
              <div className="button-box">
                <div className="button">
                  <Link to="/add-user">Buscar Usuario</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default Header;
