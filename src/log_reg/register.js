import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './register.css'; 
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);      
  const [success, setSuccess] = useState(null);   

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);   
    setSuccess(null);  
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });
      console.log(JSON.stringify(formData)); 

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Błąd serwera:', errorData);  
        throw new Error('Błąd rejestracji: ' + errorData.message || response.statusText);
      }

      await response.json();

      setSuccess('Rejestracja zakończona sukcesem!');
      setFormData({
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        password: '',
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000); 

    } catch (error) {
      setError(error.message); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="register-form">
      <h2>Rejestracja</h2>
      {error && <p className="error">{error}</p>} {}
      {success && <p className="success">{success}</p>} {}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Imię:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="surname">Nazwisko:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="phoneNumber">Numer telefonu:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            pattern="[0-9]{9}"
            placeholder="999999999"
          />
        </div>

        <div>
          <label htmlFor="password">Hasło:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Trwa rejestracja...' : 'Zarejestruj się'}
        </button>
      </form>

      {}
      <div className="login-redirect">
        <p>Masz już konto? <button onClick={() => navigate('/login')}>Zaloguj się</button></p>
      </div>
    </div>
  );
};

export default Register;
