import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'; // Importowanie pliku CSS z dodatkowymi stylami

const Home = () => {
  const [books, setBooks] = useState([]); // Stan do przechowywania listy książek
  const navigate = useNavigate(); // Hook do nawigacji

  const getBooks = async () => {
    try {
      const token = localStorage.getItem('token'); // Przykład: pobierz token z localStorage
      const response = await fetch('http://localhost:8080/books', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Dodaj token do nagłówka
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const fetchBooks = useCallback(async () => {
    const booksData = await getBooks();
    setBooks(booksData); // Ustawienie książek w stanie
  }, []); // Pusty array, ponieważ nie ma zależności w tej funkcji

  useEffect(() => {
    fetchBooks(); // Wywołanie funkcji fetchBooks
  }, [fetchBooks]); // Funkcja fetchBooks jako zależność

  const goToDetails = (id) => {
    navigate(`/books/${id}`); // Przejście do widoku szczegółów
  };

  return (
    <div className="home-container">
      <h1>Lista książek</h1>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id} className="book-item">
            <span className="book-title">{book.title}</span>
            <button className="details-button" onClick={() => goToDetails(book.id)}>Szczegóły</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
