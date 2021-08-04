import React, { useState, useEffect } from "react";
import { Button } from "../Button";
import { ImBooks } from "react-icons/im";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Navbar/Navbar.css";
import { IconContext } from "react-icons/lib";

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
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  About us
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  LOGIN
                </Link>
              </li>

              <li>
                <Link
                  to=""
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  SIGNUP
                </Link>
              </li>
            </ul>
            {button && <Button buttonStyle="btn--outline">LOGIN</Button>}
            {button && <Button buttonStyle="btn--outline">SIGNUP</Button>}
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
