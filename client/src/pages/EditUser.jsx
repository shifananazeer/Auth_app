import React, { useEffect, useState } from 'react';
import { useParams , useNavigate } from 'react-router-dom';

const EditUser = () => {
    const { id } = useParams(); // Get the user ID from the URL
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/admin/admin/edit/${id}`, { method: 'GET' });
                const data = await response.json();
                if (response.ok) {
                    setUser(data.user);
                    setUsername(data.user.username);
                    setEmail(data.user.email);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Failed to fetch user');
            }
            setLoading(false);
        };
        fetchUser();
    }, [id]);

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/admin/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email }),
            });

            if (response.ok) {
                alert('User updated successfully');
               navigate('/admin/dashboard')
            } else {
                const data = await response.json();
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to update user');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='font-extrabold text-center m-5 text-lg mt-5  p-20 '> 
            <h1 className='mb-10'>Edit User</h1>
            <form onSubmit={handleSave} className="block text-gray-700 text-sm font-bold  rounded">
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                            className=" m-5 w-1/3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                         className=" m-5 w-1/3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button type="button" onClick={handleSave}>Save</button>
            </form>
        </div>
    );
};

export default EditUser;
