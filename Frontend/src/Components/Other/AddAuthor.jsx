import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseUrl from '../../BaseUrl';

const Addcategory = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');
  const [photo, setPhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('biography', biography);
    formData.append('photo', photo);

    try {
      console.log(name,biography,photo);
      const response = await axios.post(`${BaseUrl}/author/post`,formData
    );

      if (response.status === 200) {
        alert('Author Added Successfully');
        navigate('/admin');
      } else {
        setErrorMessage('An error occurred while adding. Please try again.');
      }
    } catch (error) {
      console.error('Error during adding:', error);
      setErrorMessage('An error occurred while adding. Please try again.'+error);
    }
  };

  return (
    <div className='signuppage'>
      <section className='signup'>
        <h1 id='h1'>Add Author Details</h1>
        <form onSubmit={submitHandler}>
          <input 
            type="text"
            placeholder='Enter Name'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input 
            type="text"
            placeholder='Enter Biography'
            required
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
          />
          
          <label>Select Author Image 
            <input 
              type="file"
              required
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </label>
         
          <div className='empty'></div>
          {errorMessage && <p className='error'>{errorMessage}</p>}
          <div className='buttons'>
            <button type='submit'>Ok</button>
            <button type='button' onClick={() => navigate('/admin')}>Cancel</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Addcategory;
