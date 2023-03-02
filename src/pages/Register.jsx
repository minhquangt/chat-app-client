import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Username: ${email}, Password: ${password}`);
    };

    return (
        <div className='container'>
            <h1 className='text-center'>REGISTER SCREEN</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-outline mb-4'>
                    <label className='form-label' htmlFor='form2Example1'>
                        Username
                    </label>
                    <input
                        type='text'
                        id='form2Example1'
                        className='form-control'
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
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
                        type='submit'
                        className='btn btn-primary btn-block mb-4'
                    >
                        REGISTER
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
