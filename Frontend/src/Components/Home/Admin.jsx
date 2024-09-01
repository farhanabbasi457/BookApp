import React, { useState, useEffect } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import bookrack from "../Images/bookrack.png";
import { useLocation } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Outlet } from 'react-router-dom';

function Admin() {
  const { state } = useLocation();
  const { person} = state || {};

  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'contain',
    height: '600px',
    backgroundColor: 'black',
    opacity: '0.9'
  };

  const slideImages = [
    {
      url: 'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3N8ZW58MHx8MHx8fDA%3D',
    },
    {
      url: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJvb2tzfGVufDB8fDB8fHww',
    },
    {
      url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3N8ZW58MHx8MHx8fDA%3D',
    },
  ];

  const navigate = useNavigate();
  const halfimgpath = "http://localhost:2000//";
  const [allbooks, setBooks] = useState([]);
  const [categoryBooks, setCategoryBooks] = useState([]);
  const [Authors, setAuthors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [Users, setUsers] = useState([]);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [searchType, setSearchType] = useState("book");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data:{message} } = await axios.get(`http://localhost:2000/books`);
        setBooks(message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchCategoryData = async () => {
      try {
        const { data:{message} } = await axios.get(`http://localhost:2000/category`);
        setCategoryBooks(message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchAuthor = async () => {
      try {
        const { data:{message} } = await axios.get(`http://localhost:2000/author`);
        setAuthors(message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchUsers = async () => {
      try {
        const { data:{message} } = await axios.get(`http://localhost:2000/user/user`);
        setUsers(message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    fetchCategoryData();
    fetchAuthor();
    fetchUsers();

  }, []);

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

  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      try {
        window.scrollTo(0, 600);
        let response;
        if (searchType === "book") {
          response = await axios.get(`http://localhost:2000/books/${searchQuery}`);
        } else if (searchType === "category") {
          response = await axios.get(`http://localhost:2000/category/${searchQuery}`);
        } else if (searchType === "author") {
          response = await axios.get(`http://localhost:2000/author/${searchQuery}`);
        }
        
        const searchResults = response?.data?.message;
        setFilteredBooks(Array.isArray(searchResults) ? searchResults : []);
        setSearchSubmitted(true);
      } catch (error) {
        console.error('Error searching books:', error);
      }
    }
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };


  const Card = ({ id,img, booktitle, bookdes, pdf2, author,person1 ,start_time }) => {
    const handleClick = () => {
      navigate("/bookdetail", { state: { img, booktitle, bookdes, pdf2,id, author,person1,start_time} });
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
        {Array.isArray(books) && books.length > 0 ? (books.map((item, index) => {
          console.log(books.length);
          const img1 = item.cover_image ? item.cover_image.replace("public\\", "") : '';
          const pdf1 = item.pdf ? item.pdf.replace("public\\", "") : '';
          const author = authors.find(author => item.author_ID && author._id === item.author_ID._id);

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
        })): (
          <p>No Book Available</p>
        )}

      </div>
    </div>
  );
  
  const Row1 = ({ title, details,person2, url }) => (
    <div className='row'>
      <h2>{title} <img src={bookrack} alt="bookCategoryrack" /></h2>
      <div className='card-img'>
        {details.map((item, index) => (
          <div key={index} className='name' onClick={() => { navigate(url, { state: { name: item.name , id:item._id ,person:person2} }) }}>{item.name}</div>
        ))}
      </div>
    </div>
  );
  const Row2 = ({ title, details, url }) => (
    <div className='row'>
      <h2>{title} <img src={bookrack} alt="bookCategoryrack" /></h2>
      <div className='card-img'>
        {details.map((item, index) => (
          <div key={index} className='name' onClick={() => { navigate(url, { state: { user1: item } }) }}>{item.name}</div>
        ))}
      </div>
    </div>
  );


  const handleAdding=()=>{
    navigate("/addcategory");
  }
  const handleDeleting=()=>{
    navigate("/deletecategory");
  }
  const handleUpdating=()=>{
    navigate("/updatecategory");
  }
  const handleAuthorAdding=()=>{
    navigate("/addauthor");
  }
  const handleAuthorDeleting=()=>{
    navigate("/deleteauthor");
  }
  const handleAuthorUpdating=()=>{
    navigate("/updateauthor");
  }
  const handleBookAdding=()=>{
    navigate("/addbooks");
  }
  const handleBookdeleting=()=>{
    navigate("/deletebooks");
  }
  const handleBookUpdating=()=>{
    navigate("/updatebooks");
  }
  const handleUserAdding=()=>{
    navigate("/adduser");
  }
  const handleUserDeleting=()=>{
    navigate("/deleteuser");
  }
  return (
    <div className='user'>
      <div className='searchbar'>
        <input
          placeholder='search by book name'
          value={searchQuery}
          onChange={handleSearchInput}
          onKeyDown={handleSearchSubmit}
        />
        <BiSearchAlt className='iconbutton' onClick={handleSearchSubmit}/>
      </div>
      <div className='search-options'>
        <label>
          <input
            type="radio"
            value="book"
            checked={searchType === "book"}
            onChange={handleSearchTypeChange}
          />
          Book Title
        </label>
        <label>
          <input
            type="radio"
            value="author"
            checked={searchType === "author"}
            onChange={handleSearchTypeChange}
          />
          Author
        </label>
        <label>
          <input
            type="radio"
            value="category"
            checked={searchType === "category"}
            onChange={handleSearchTypeChange}
          />
          Category
        </label>
      </div>
      <div className='user-admin'>ADMIN  VIEW</div>
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div key={index} style={{ marginTop: "5px" }}>
            <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}></div>
          </div>
        ))}
      </Slide>
      {searchSubmitted ? (
        <Row title={"Filtered Books"} books={filteredBooks} authors={Authors}/>
        
      ) : (
        <><Row title={"Books Rack"} books={allbooks} authors={Authors}/>
        <button className='addbutton' onClick={handleBookAdding}>Add</button>
        <button className='addbutton' onClick={handleBookdeleting}>Delete</button>
        <button className='addbutton' onClick={handleBookUpdating}>Update</button></>
        
      )}
      <div className='empty'></div>
      <Row1 title={"Category"} details={categoryBooks} person2={person} url={"/categorydetails"}  />
      <button className='addbutton' onClick={handleAdding}>Add</button>
      <button className='addbutton' onClick={handleDeleting}>Delete</button>
      <button className='addbutton' onClick={handleUpdating}>Update</button>
      <Row1 title={"Authors"} details={Authors} person2={person} url={"/authordetails"}/>
      <button className='addbutton' onClick={handleAuthorAdding}>Add</button>
      <button className='addbutton' onClick={handleAuthorDeleting}>Delete</button>
      <button className='addbutton' onClick={handleAuthorUpdating}>Update</button>

      <Row2 title={"Users"} details={Users} url={"/userdetails"}/>
      <button className='addbutton' onClick={handleUserAdding}>Add</button>
      <button className='addbutton' onClick={handleUserDeleting}>Delete</button>
    </div>
  );
}

export default Admin;