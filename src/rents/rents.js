import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './rents.css'; 
const Rents = () => {
  const [rents, setRents] = useState([]); 

  const fetchRents = async () => {
    console.time('Fetching rents');
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.get('http://localhost:8080/user/rents', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      setRents(response.data); 
    } catch (error) {
      console.error(error);
      alert('Błąd przy pobieraniu danych');
    }
    console.timeEnd('Fetching rents');
  };

  useEffect(() => {
    console.log('Fetching rents...');
    fetchRents();
  }, []);

  const handleReturnBook = async (rentId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:8080/user/rents/${rentId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Książka zwrócona!');

      setRents((prevRents) => prevRents.filter((rent) => rent.id !== rentId));
    } catch (error) {
      console.error(error);
      alert('Nie udało się zwrócić książki');
    }
  };

  if (rents.length === 0) {
    return <p>Brak wypożyczeń do wyświetlenia</p>;
  }

  return (
    <div className="rents-container">
      <h1>Twoje wypożyczenia</h1>
      <div className="rents-list">
        {rents.map((rent) => (
          <div key={rent.id} className="rent-item">
            <div className="rent-details">
              <p className="rent-title"><strong>Tytuł:</strong> {rent.title}</p>
              <p><strong>Data wypożyczenia:</strong> {new Date(rent.rentDate).toLocaleDateString()}</p>
              {rent.returnDate && (
                <p><strong>Termin zwrotu:</strong> {new Date(rent.returnDate).toLocaleDateString()}</p>
              )}
            </div>
            {!rent.returnDate && (
              <button className="return-button" onClick={() => handleReturnBook(rent.id)}>Zwróć książkę</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rents;
