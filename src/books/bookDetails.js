import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './bookDetails.css'; 

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [book, setBook] = useState(null); 

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/books/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }

        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleBackToHome = () => {
    navigate('/'); 
  };

  const handleRentBook = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(`http://localhost:8080/books/${id}/rent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to rent the book');
      }

      alert('Book rented successfully!'); 
    } catch (error) {
      console.error(error);
      alert('Failed to rent the book'); 
    }
  };

  if (!book) {
    return <p>Loading...</p>; 
  }

  return (
    <div className="book-details">
      <h1>Szczegóły książki</h1>
      <p><strong>Tytuł:</strong> {book.title}</p>
      <p><strong>Rok wydania:</strong> {book.yearOfRelease}</p>
      <p><strong>Autor:</strong> {book.author}</p>
      <p><strong>Kategoria:</strong> {book.category}</p>
      <p><strong>Liczba kopii:</strong> {book.numberOfCopies}</p>

      {}
      <button onClick={handleBackToHome}>Powrót na stronę główną</button>
      <button onClick={handleRentBook}>Wypożycz książkę</button>
    </div>
  );
};

export default BookDetails;
