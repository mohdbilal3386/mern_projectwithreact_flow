import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../../../context/authContext";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      alert("Invalid credentials");
    }
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h1>SpaceX</h1>
      </div>
      <button className={styles.menuButton} onClick={toggleMenu}>
        ☰
      </button>
      <div className={`${styles.navbarItems} ${isOpen ? styles.open : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${styles.navbarItem} ${styles.active}`
              : styles.navbarItem
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/callWorkflow"
          className={({ isActive }) =>
            isActive
              ? `${styles.navbarItem} ${styles.active}`
              : styles.navbarItem
          }
        >
          Call Workflow
        </NavLink>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
