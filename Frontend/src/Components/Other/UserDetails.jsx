import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Authordetails = () => {
    const { state } = useLocation();
    const { user1 } = state || {};

    const navigate = useNavigate();
    const handleGO = () => {
        navigate("/admin");
    }

    return (
        <div className='signuppage'>
            <section className='signup'>
                <form  >
                    <label>
                        <b>Name:</b>
                    </label> 
                    <input
                        type='text'
                        value={user1.name}
                    />
                    <label>
                        <b>Email:</b>
                    </label> 
                    <input
                        type='text'
                        value={user1.email}
                    />
                    <label>
                       <b>Password:</b> 
                    </label> 
                    <input
                        type='text'
                        value={user1.password}
                    />
                    <div className='empty'></div>
                    <div className='buttons'>
                        <button type='button' onClick={handleGO}>Go Back</button>
                    </div>
                </form>
            </section>
        </div>
    )
};

export default Authordetails;
