import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Login from './log_reg/login';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";
import BookDetails from './books/bookDetails';
import Rents from './rents/rents';
import Register from './log_reg/register';

function App() {
  return (
    <div className="App">
      <Router>
        <TokenChecker>
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/rents" element={<Rents />} />
          </Routes>
        </TokenChecker>
      </Router>
    </div>
  );
}

export default App;

function TokenChecker({ children }) {
  const navigate = useNavigate();

  const isTokenExpired = (token) => {
    if (!token) return true; 
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    const currentTime = Math.floor(Date.now() / 1000); 
    return decodedPayload.exp < currentTime; 
  };

  const checkToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token"); 
      navigate("/login"); 
    }
  }, [navigate]);

  useEffect(() => {
    if (window.location.pathname !== '/register') {
      const interval = setInterval(() => {
        checkToken();
      }, 60000); 

      checkToken();

      return () => clearInterval(interval);
    }
  }, [checkToken]);

  return <>{children}</>;
}
