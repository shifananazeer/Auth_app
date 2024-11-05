import React, { useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import { signInStart , signInSuccess , signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../components/OAuth';

const SignIn= () => {
  const [formData, setFormData] = useState({});
  const {loading , error} = useSelector((state) => state.user)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
     
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log('Signup status:', data);
    
     if(data.success === false) {
      dispatch(signInFailure(data))
      return ;
     }

     dispatch(signInSuccess (data))
     
      navigate('/')
    } catch (error) {
      console.error('Signup error:', error.message);
     dispatch(signInFailure(error))
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
    
        <input
          type="email"
          placeholder="email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />

        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:optional:80">
       {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an Account?</p>
        <Link to={'/sign-Up'}>
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error ? error.message || "Something Went Wrong" : " "}</p>
    </div>
  );
};

export default SignIn;
