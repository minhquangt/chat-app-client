import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../store/reducer/userReducer';
import { unwrapResult } from '@reduxjs/toolkit';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`Username: ${email}, Password: ${password}`);
        try {
            const resultAction = await dispatch(loginUser({ email, password }));
            const user = unwrapResult(resultAction);
            if (user) navigate('/');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className='container'>
            <h1 className='text-center'>LOGIN SCREEN</h1>
            <form>
                <div className='form-outline mb-4'>
                    <label className='form-label' htmlFor='form2Example1'>
                        Email address
                    </label>
                    <input
                        type='email'
                        id='form2Example1'
                        className='form-control'
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>

                <div className='form-outline mb-4'>
                    <label className='form-label' htmlFor='form2Example2'>
                        Password
                    </label>
                    <input
                        type='password'
                        id='form2Example2'
                        className='form-control'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className='d-grid gap-2'>
                    <button
                        type='button'
                        className='btn btn-primary btn-block mb-4'
                        onClick={handleSubmit}
                    >
                        LOGIN
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
