import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { adminLoginFailer, adminLoginStart, adminLoginSuccess, clearError } from '../redux/admin/adminSlice';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading } = useSelector((state) => state.admin);

    const handleSubmit = async (e) => {  // Make sure to include the event parameter
        e.preventDefault();  // Prevent the default form submission
        dispatch(clearError());
        dispatch(adminLoginStart());

        try {
            const response = await fetch('/api/admin/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                dispatch(adminLoginFailer(errorData.message));
                return;
            }
            const data = await response.json();
            localStorage.setItem('token', data.token);
            dispatch(adminLoginSuccess(data));
            navigate('/admin/dashboard'); 
        } catch (error) {
            dispatch(adminLoginFailer('Something went wrong. Please try again.'));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
