// UserProfile.js

import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('authenticatedUser'));

    if (userData) {
      setUser(userData);
    }
  }, []);

  if (!user) {
    return <div className='text-center mt-4'>Login First...</div>;
  }

  return (
    <>
      <Navbar />
      <div className='container mx-auto flex justify-center items-center h-full mt-8'>
        <div className='text-center'>
          <img
            src={user.profilePicture}
            alt={user.username}
            className='w-40 h-40 rounded-full mx-auto'
          />
          <h2 className='text-lg font-semibold my-4'>
            <b>Username: </b>
            {user.username}
          </h2>
          <p className='text-gray-600'>
            <b>Bio: </b>
            {user.bio}
          </p>
        </div>
      </div>
    </>
  );
};

export default Profile;
