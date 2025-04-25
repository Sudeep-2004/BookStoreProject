import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from 'react-toastify';

const Login = () => {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const { email, password } = loginInfo;

        if (!email || !password) {
            return handleError('All fields are required');
        }

        try {
            const url = 'https://bookstoreproject-imm7.onrender.com/auth/login';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(loginInfo)
            });

            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;

            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInname', name);

                setTimeout(() => {
                    navigate('/home');
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
                <h2 className="text-3xl text-center font-semibold text-gray-800">Login</h2>
                <form onSubmit={handleLogin} className="mt-6 space-y-6">
                    <div>
                        <label htmlFor="email" className="text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={loginInfo.email}
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
                            value={loginInfo.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full p-2 border border-gray-300 rounded-md mt-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-600">Signup</Link>
                    </span>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default Login;
