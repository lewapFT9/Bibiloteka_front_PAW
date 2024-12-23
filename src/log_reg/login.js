import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'; 
const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            navigate("/");  
        } else {
            alert("Nieprawidłowe dane logowania!");
        }
    };

    return (
        <div className="login-container">
            <h1>Logowanie</h1>
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Hasło"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                />
                <button type="submit">Zaloguj się</button>
            </form>

            {}
            <div className="register-link">
                <button onClick={() => navigate("/register")}>Zarejestruj się</button>
            </div>
        </div>
    );
};

export default Login;
