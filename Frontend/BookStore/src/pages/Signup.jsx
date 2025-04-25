import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

const Signup = () => {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        const { name, email, password } = signupInfo;

        if (!name || !email || !password) {
            return handleError('All fields are required');
        }

        try {
            const url = "http://localhost:3001/auth/signup";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                },
                body: JSON.stringify(signupInfo)
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
            } else if (!success) {
                handleError(message);
            }

        } catch (err) {
            handleError(err);
        }
    };

    return (
        <>
            <div className="max-w-sm mx-auto mt-12 p-6 border-2 rounded-lg shadow-lg bg-white">
                <h2 className="text-3xl text-center font-semibold text-gray-800">Signup</h2>
                <form onSubmit={handleSignup} className="mt-6 space-y-6">
                    <div>
                        <label htmlFor="name" className="text-sm text-gray-600">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={signupInfo.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full p-2 border border-gray-300 rounded-md mt-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={signupInfo.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full p-2 border border-gray-300 rounded-md mt-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm text-gray-600">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={signupInfo.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full p-2 border border-gray-300 rounded-md mt-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-green-600 text-white rounded-md mt-4 hover:bg-green-700 transition"
                    >
                        Signup
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600">Login</Link>
                    </span>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default Signup;
