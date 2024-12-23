import React from 'react';
import { useNavigate } from "react-router-dom"; 
import './navbar.css'; 

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); 
  };

  const goToRents = () => {
    navigate("/rents");
  };

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="navbar-container">
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <button onClick={handleLogout} className="nav-btn logout">
                      Wyloguj
                    </button>
                  </li>
                  <li className="nav-item">
                    <button onClick={goToRents} className="nav-btn rents">
                      Wypożyczenia
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
