import React, { useState, useEffect } from "react";
import { ImBooks } from "react-icons/im";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { IconContext } from "react-icons/lib";
import { Button } from "../Button";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              Lend-A-Book
              <div className="logo-icon">
                <ImBooks className="navbar-icon" />
              </div>
            </Link>

            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link
                  to="/Home"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/AboutUs"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  About us
                </Link>
              </li>

              <li>
                <Link
                  to="/Login"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  LOGIN
                </Link>
              </li>

              <li>
                <Link
                  to="/SignUp"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  SIGNUP
                </Link>
              </li>
            </ul>

            <Link to="/Login" className="btn--outline">
              LOGIN
            </Link>
            <Link to="/SignUp" className="btn--outline">
              SIGNUP
            </Link>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
