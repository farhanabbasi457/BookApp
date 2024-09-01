
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Addcategory = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();


    try {
      const response = await axios.delete(`http://localhost:2000/user/${email}`);

      console.log(response.data.message);
      if (response.data.message === 1 ) {
        alert('User Deleted Successfully');
        navigate('/admin');
      }
      else{
        setErrorMessage("Email not found");
      }
    } catch (error) {
      console.error('Error during Adding:', error);
    }
  };

  return (
    <div className='signuppage'>
      <section className='signup'>
        <h1 id='h1'>Delete User Here</h1>
        <form onSubmit={submitHandler}>
          
          <input 
          type="email"
            placeholder='Enter User Email' 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

export default Addcategory;
