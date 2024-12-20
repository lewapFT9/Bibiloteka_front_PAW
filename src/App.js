import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Login from './log_reg/login';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <TokenChecker>
          <Navbar />
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<Home />} />
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
    const interval = setInterval(() => {
      checkToken();
    }, 60000); 

    checkToken();

    return () => clearInterval(interval);
  }, [checkToken]);

  return <>{children}</>;
}
