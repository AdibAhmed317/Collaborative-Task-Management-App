import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem(username);
    if (!storedUser) {
      setError('User not found. Please register.');
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.password !== password) {
      setError('Incorrect password. Please try again.');
      return;
    }

    localStorage.setItem('authenticatedUser', JSON.stringify(user));

    navigate('/profile');
  };

  return (
    <>
      <Navbar />
      <div className='w-full max-w-xs mx-auto mt-8'>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <div className='mb-4'>
            <label
              htmlFor='username'
              className='block text-gray-700 text-sm font-bold mb-2'>
              Username
            </label>
            <input
              type='text'
              id='username'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              required
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block text-gray-700 text-sm font-bold mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              required
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              onClick={handleLogin}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Log In
            </button>
          </div>
          <div className='text-red-500 text-xs italic'>{error}</div>
          <Link to='/register'>Register</Link>
        </form>
      </div>
    </>
  );
};

export default Login;
