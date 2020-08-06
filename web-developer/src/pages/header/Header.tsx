import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

type Props = {};

const Header: React.FC<Props> = () => {
  return (
    <nav className="nav-container">
      <div>
        <Link className="link-navigation" to="/">Home</Link>
      </div>
      <div>
        <Link className="link-navigation" to="/developer">Desenvolvedor</Link>
      </div>
    </nav>
  );
};

export default Header;
