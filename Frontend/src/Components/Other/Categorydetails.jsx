import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bookrack from "../Images/bookrack.png";
import BaseUrl from '../../BaseUrl';

const Categorydetails = () => {
  const { state } = useLocation();
  const { name, id,person } = state || {};

  const navigate = useNavigate();
  const halfimgpath =`${BaseUrl}//`;
  const [allbooks, setBooks] = useState([]);
  const [authors1, setAuthors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { message } } = await axios.get(`${BaseUrl}/books`);
        const filteredBooks = message.filter(book => book.category_ID._id === id);
        setBooks(filteredBooks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchAuthorData = async () => {
      try {
        const { data: { message } } = await axios.get(`${BaseUrl}/author`);
        setAuthors(message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    fetchAuthorData();
    window.scrollTo(0, 0);
  }, [id]);

  function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const Card = ({ id,img, booktitle, bookdes, pdf2, author,person1,start_time }) => {
    const handleClick = () => {
      navigate("/bookdetail", { state: { img, booktitle, bookdes, pdf2,id, author,person1 ,start_time} });
    };
    return (
      <div className='imgtitle'>
        <img className='card' src={img} alt={booktitle} onClick={handleClick} />
      </div>
    );
  };


  const Row = ({ title, books, authors }) => (
    <div className='row'>
      <h2>{title} <img src={bookrack} alt="bookrack" /></h2>
      <div className='card-img'>
        {books.map((item, index) => {
          const img1 = item.cover_image ? item.cover_image.replace("public\\", "") : '';
          const pdf1 = item.pdf ? item.pdf.replace("public\\", "") : '';
          const author = authors.find(author => author._id === item.author_ID._id);
          return (
            <Card
              key={index}
              id={item._id}
              booktitle={item.title}
              img={`${halfimgpath}${img1}`}
              bookdes={item.description}
              pdf2={`${halfimgpath}${pdf1}`}
              author={author}
              person1={person}
              start_time={getCurrentDate()}
              
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <Row title={name} books={allbooks} authors={authors1} />
  );
};

export default Categorydetails;
