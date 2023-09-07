import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Navbar = () => {
  return (
    <nav className='bg-gray-900 w-screen h-14 text-white flex justify-between items-center'>
      <Link to='/' className='text-xl font-bold mx-4'>
        Task Manager
      </Link>
      <ul className='flex space-x-4 mr-4'>
        <li>
          <Link to='/tasks'>Tasks</Link>
        </li>
        <li>
          <Link to='/teams'>Teams</Link>
        </li>
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
