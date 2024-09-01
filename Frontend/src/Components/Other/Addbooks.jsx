import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Addcategory = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [pdf, setPDF] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchAuthorsAndCategories = async () => {
      try {
        const authorsResponse = await axios.get('http://localhost:2000/author');
        const categoriesResponse = await axios.get('http://localhost:2000/category');
        setAuthors(authorsResponse.data.message);
        setCategories(categoriesResponse.data.message);
      } catch (error) {
        console.error('Error fetching authors and categories:', error);
      }
    };

    fetchAuthorsAndCategories();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('cover_image', coverImage);
    formData.append('pdf', pdf);
    formData.append('author_ID', selectedAuthor);
    formData.append('category_ID', selectedCategory);

    try {
      const response = await axios.post('http://localhost:2000/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Book Added Successfully');
        navigate('/admin');
      } else {
        setErrorMessage('An error occurred during Adding. Please try again.');
      }
    } catch (error) {
      console.error('Error during Adding:', error);
      setErrorMessage('An error occurred during Adding. Please try again.');
    }
  };

  return (
    <div className='signuppage'>
      <section className='signup'>
        <h1 id='h1'>Add Book details</h1>
        <form onSubmit={submitHandler}>
          <input 
            type="text"
            placeholder='Enter Title'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input 
            type="text"
            placeholder='Enter Description'
            required
            value={description}
            onChange={(e) => setDesc(e.target.value)}
          />
          <select 
            required
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author._id} value={author._id}>
                {author.name}
              </option>
            ))}
          </select>
          <br/>
          <select 
            required
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <label>Select cover Image 
            <input 
              type="file"
              required
              onChange={(e) => setCoverImage(e.target.files[0])}
            />
          </label>
          <label>Select PDF 
            <input  
              type='file'
              required
              onChange={(e) => setPDF(e.target.files[0])}
            />
          </label>
          <div className='empty'></div>
          {errorMessage && <p className='error'>{errorMessage}</p>}
          <div className='buttons'>
            <button type='submit'>Ok</button>
            <button type='button' onClick={() => { navigate("/admin") }}>Cancel</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Addcategory;
