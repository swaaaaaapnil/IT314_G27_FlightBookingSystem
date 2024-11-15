import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import './index.css';
import Navbar from './Navbar';
import Header from './Header';
function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prevState => !prevState);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = signupInfo;
        
        if (!name || !email || !password || !confirmPassword) {
            return handleError('All fields are required');
        }

        if (password !== confirmPassword) {
            return handleError('Passwords do not match');
        }

        try {
            const url = `http://localhost:8090/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError(err.message);
        }
    };

    return (
        <div>
            <Navbar/>
            <Header type="list"/>
        <div className='login-background'>
            <div className='login-container'>
                <h1>Signup</h1>
                <form onSubmit={handleSignup}>
                    <div>
                        <label htmlFor='name' className='login-label'>Name</label>
                        <input
                            onChange={handleChange}
                            type='text'
                            name='name'
                            autoFocus
                            placeholder='Enter your name...'
                            value={signupInfo.name}
                            className='login-input'
                        />
                    </div>
                    <div>
                        <label htmlFor='email' className='login-label'>Email</label>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            value={signupInfo.email}
                            className='login-input'
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <label htmlFor='password' className='login-label'>Password</label>
                        <input
                            onChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            placeholder='Enter your password...'
                            value={signupInfo.password}
                            className='login-input'
                        />
                        {/* Uncomment the following for toggling visibility icons
                        <span onClick={togglePasswordVisibility} style={{ position: 'absolute', right: '10px', top: '35px', cursor: 'pointer' }}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        */}
                    </div>
                    <div style={{ position: 'relative' }}>
                        <label htmlFor='confirmPassword' className='login-label'>Confirm Password</label>
                        <input
                            onChange={handleChange}
                            type={showConfirmPassword ? 'text' : 'password'}
                            name='confirmPassword'
                            placeholder='Confirm your password...'
                            value={signupInfo.confirmPassword}
                            className='login-input'
                        />
                        {/* Uncomment the following for toggling visibility icons
                        <span onClick={toggleConfirmPasswordVisibility} style={{ position: 'absolute', right: '10px', top: '35px', cursor: 'pointer' }}>
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        */}
                    </div>
                    <button type='submit' className='login-button'>Signup</button>
                    <span>Already have an account? <Link to="/login">Login</Link></span>
                </form>
                <ToastContainer />
            </div>
        </div>
        </div>
    );
}

export default Signup;
