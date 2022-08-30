import React from "react";
import logo from "../../images/Logo.svg";

import "./Nav.scss";

const Nav = () => {
  return (
      <nav className="nav">
        <div className="nav__content">
          <img
            src={logo}
            alt="testtask logo"
            className="nav__logo"
          />
          
          <div className="nav__buttons">
            <button className="nav__users button">
            <a href='#users'>Sign up</a>
            </button>

            <button className="nav__sign-up button">
              <a href='#signUp'>Sign up</a>
            </button> 
          </div>
        </div>
      </nav>
  );
};

export default Nav;
