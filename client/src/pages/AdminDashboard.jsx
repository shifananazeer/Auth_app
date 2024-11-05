import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserSuccess, fetchUsersFailure, fetchUsersStart, fetchUsersSuccess, updateUserSuccess ,addUserSuccess } from '../redux/user/userSlice';
import { Link } from 'react-router-dom';


const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { users = [], error, loading } = useSelector((state) => state.user); 
    const [searchTerm, setSearchTerm] = useState('');
    const [newUser, setNewUser] = useState({ 
        username: '', 
        email: '', 
        password: '', 
        profilePicture: '',
        isAdmin: false 
    });

    useEffect(() => {
        const fetchUsers = async () => {
            dispatch(fetchUsersStart());
            const token = localStorage.getItem('token'); 

            try {
                const response = await fetch('/api/admin/users', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    dispatch(fetchUsersFailure(errorData.message));
                    return;
                }

                const data = await response.json();
                console.log("Fetched Users:", data); 
                dispatch(fetchUsersSuccess(data));
            } catch (error) {
                dispatch(fetchUsersFailure('Failed to fetch users.'));
            }
        };
        fetchUsers();
    }, [dispatch]);

    const handleChange = (e) => { 
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleCreateUser = async () => {
        try {
            const response = await fetch('/api/admin/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                dispatch(fetchUsersFailure(errorData.message));
                return;
            }
    
            const data = await response.json();
            dispatch(addUserSuccess(data)); 
            dispatch(fetchUsersSuccess([...users, data])); 
            setNewUser({ username: '', email: '', password: '', profilePicture: '', isAdmin: false });
        } catch (error) {
            dispatch(fetchUsersFailure('Failed to create user.'));
        }
    };
    
    
    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(`/api/admin/delete/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                dispatch(deleteUserSuccess(userId)); 
                const updatedUsers = users.filter(user => user._id !== userId);
                dispatch(fetchUsersSuccess(updatedUsers)); 
            } else {
                const errorData = await response.json();
                dispatch(fetchUsersFailure(errorData.message));
            }
        } catch (error) {
            dispatch(fetchUsersFailure('Failed to delete user.'));
        }
    };
    

   

    // Filter users 
    const filteredUsers = Array.isArray(users) ? users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
            
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by username"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <h3 className="text-xl font-semibold">Create User</h3>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={handleChange}
                    className="p-2 m-5 border border-gray-300 rounded shadow appearance-none  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={handleChange}
                    className="p-2 m-5 border border-gray-300 rounded shadow appearance-none  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={handleChange}
                    className="p-2 m-5 border border-gray-300 rounded shadow appearance-none  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button onClick={handleCreateUser} className="bg-blue-500 text-white p-2 rounded">
                    Create User
                </button>
            </div>

            {error && <div className="text-red-500">{error}</div>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="  min-w-full border-collapse border-spacing-5  border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300">Username</th>
                            <th className="border border-gray-300">Email</th>
                            <th className="border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map((user) => (
                            <tr key={user._id}>
                                <td className="border border-gray-300">{user.username}</td>
                                <td className="border border-gray-300">{user.email}</td>
                                <td className="border border-gray-300">
                                    <Link to={`/admin/edit/${user._id}`}>
                                        <button className="text-blue-500">
                                            Edit
                                        </button>
                                    </Link>
                                    <button onClick={() => handleDeleteUser(user._id)} className="text-red-500 ml-2">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminDashboard;
