import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    handleRegistration(username, password, bio, profilePicture);

    setUsername('');
    setPassword('');
    setBio('');
    setProfilePicture(null);
  };

  const handleRegistration = (username, password, bio, profilePicture) => {
    if (users.some((user) => user.username === username)) {
      alert('Username already exists. Please choose another username.');
      return;
    }

    // Create a new user object
    const newUser = { username, password, bio, profilePicture };

    setUsers([...users, newUser]);
    localStorage.setItem(username, JSON.stringify(newUser));

    alert('Registration successful!');
    navigate('/');
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicture(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navbar />
      <div className='w-full max-w-xs mx-auto mt-8'>
        <form
          onSubmit={handleSubmit}
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
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
          <div className='mb-4'>
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
          <div className='mb-4'>
            <label
              htmlFor='bio'
              className='block text-gray-700 text-sm font-bold mb-2'>
              Bio
            </label>
            <textarea
              id='bio'
              placeholder='Bio'
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='profilePicture'
              className='block text-gray-700 text-sm font-bold mb-2'>
              Profile Picture
            </label>
            <input
              type='file'
              id='profilePicture'
              accept='image/*'
              onChange={handleProfilePictureChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='text-red-500 text-xs italic'>{error}</div>
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Register
            </button>
          </div>
          <Link to='/'>Login</Link>
        </form>
      </div>
    </>
  );
};

export default Registration;
