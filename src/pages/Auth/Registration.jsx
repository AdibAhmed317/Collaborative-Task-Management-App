import React, { useState } from 'react';
import Navbar from '../../components/Navbar';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');

  // Define state for users and current user
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form fields (add more validation as needed)
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Call the handleRegistration function to handle user registration
    handleRegistration(username, password, bio);

    // Clear form fields
    setUsername('');
    setPassword('');
    setBio('');
  };

  // Handle user registration and store data in local storage
  const handleRegistration = (username, password, bio) => {
    // Check if the username already exists
    if (users.some((user) => user.username === username)) {
      alert('Username already exists. Please choose another username.');
      return;
    }

    // Create a new user object
    const newUser = { username, password, bio };

    // Update the state and store user data in local storage
    setUsers([...users, newUser]);
    localStorage.setItem(username, JSON.stringify(newUser));

    // Set the current user
    setCurrentUser(newUser);

    alert('Registration successful!');
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
          <div className='text-red-500 text-xs italic'>{error}</div>
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
