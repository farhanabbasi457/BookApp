import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseUrl from '../../BaseUrl';

const Deleteitem = () => {
  const navigate = useNavigate();
  const [name, setname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
        const response = await axios.delete(`${BaseUrl}/books/${name}`);

      if (response.data.message === 1) {
        alert("Item Deleted Successfully");
        navigate('/admin');
      }
      else{
        setErrorMessage("Item Not Found");
      }
    } catch (error) {
      console.error('Error during Adding:', error);
    }
  };

  return (
    <div className='signuppage'>
      <section className='signup'>
        <h1 id='h1'>Delete Item Here</h1>
        <form onSubmit={submitHandler}>
          <input 
            type="text"
            placeholder='Enter Name'
            required
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          {errorMessage && <p className='error'>{errorMessage}</p>}
          <div className='empty'></div>
          <div className='buttons'>
            <button type='submit'>Ok</button>
            <button type='button' onClick={() => { navigate("/admin") }}>Cancel</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Deleteitem;
