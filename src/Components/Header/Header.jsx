import React, { useState } from "react";
import { Link } from "react-router-dom";
import headImage from "../../assets/evangadi-logo-black.png";
import styles from "./Header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = localStorage.getItem("token");

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // Add logout logic here
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header className={styles.outer_container}>
      <div className={styles.inner_container}>
        <div className={styles["logo-container"]}>
          <Link to="/">
            <img src={headImage} alt="Evangadi Logo" />
          </Link>
        </div>
        <div>
          <button
            className={styles["menu-toggle"]}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? "✖" : "☰"}
          </button>

          <nav
            className={`${styles["nav-container"]} ${
              isMenuOpen ? styles.open : ""
            }`}
          >
            <ul className={styles["nav-list"]}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className={styles.divider} />
              <li>
                <Link to="/how-it-works">How it Works</Link>
              </li>
              <li className={styles.divider} />
            </ul>

            <div>
              {token ? (
                <button
                  className={styles["button-container"]}
                  onClick={handleLogout}
                >
                  LOG OUT
                </button>
              ) : (
                <Link to="/login">
                  <button className={styles["button-container"]}>
                    SIGN IN
                  </button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
