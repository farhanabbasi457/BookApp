import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseUrl from '../../BaseUrl';

const Addcategory = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();

    
    try {
      const response = await axios.delete(`${BaseUrl}/author/${name}`);

      if (response.data.message === 1) {
        alert('Author Deleted Successfully');
        navigate('/admin');
      } 
      else{
        setErrorMessage("Author Not Found");
      }
    } catch (error) {
      console.error('Error during adding:', error);
    }
  };

  return (
    <div className='signuppage'>
      <section className='signup'>
        <h1 id='h1'>Delete Author Here</h1>
        <form onSubmit={submitHandler}>
          <input 
            type="text"
            placeholder='Enter Name'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errorMessage && <p className='error'>{errorMessage}</p>}
          
          <div className='empty'></div>
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
