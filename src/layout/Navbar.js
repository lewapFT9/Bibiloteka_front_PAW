import React from 'react';
import { useNavigate } from "react-router-dom"; 

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); 
  };

  const styles = {
    logoutButton: {
      padding: "5px 10px",
      backgroundColor: "#ff4d4d",
      color: "white",
      border: "none",
      cursor: "pointer",
      borderRadius: "5px",
    },
  };

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Biblioteka</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <ul className="navbar-nav ms-auto"> {}
            {}
            {isLoggedIn && (
              <li className="nav-item">
                <button onClick={handleLogout} style={styles.logoutButton}>
                  Wyloguj
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
