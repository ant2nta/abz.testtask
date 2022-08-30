import React from "react";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__title">
          Test assignment for front-end developer
        </h1>

        <p className="header__description body-text">
        What defines a good front-end developer is one that has skilled knowledge of HTML, CSS,
        JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind.
        They should also be excited to learn, as the world of Front-End Development keeps evolving.
        </p>

        <button className="header__button button">
          <a href='#signUp'>Sign up</a>
        </button>
      </div>
    </header>
  );
};

export default Header;
