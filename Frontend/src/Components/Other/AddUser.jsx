import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const Addcategory = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Cpassword, setCPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    if (password !== Cpassword) {
        setErrorMessage('Passwords do not match');
        return;
      }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      const response = await axios.post('http://localhost:2000/user', {
        name,
        email,
        password:hashedPassword,
        state:"user"
      });

      if (response) {
        alert('User Added Successfully');
        navigate('/admin');
      }else {
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
        <h1 id='h1'>Add User details</h1>
        <form onSubmit={submitHandler}>
          
          <input 
          type="string"
            placeholder='Enter User Name' 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          <input  
          type='email'
            placeholder='Enter User Email' 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input  
          type='password'
            placeholder='Enter User Password' 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input  
          type='password'
            placeholder='Confirm Password' 
            required 
            value={Cpassword}
            onChange={(e) => setCPassword(e.target.value)}
          />

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
