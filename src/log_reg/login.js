import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <form onSubmit={handleLogin}>
            <input
                type="email" 
                placeholder="Email"
                value={credentials.email} 
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Hasło"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <button type="submit">Zaloguj się</button>
        </form>
    );
};

export default Login;
