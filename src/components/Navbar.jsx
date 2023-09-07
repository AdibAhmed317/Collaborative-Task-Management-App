import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const isLoggedin = localStorage.getItem('authenticatedUser');
    if (isLoggedin) {
      localStorage.removeItem('authenticatedUser');
      navigate('/');
    } else {
      alert('login first');
    }
  };
  return (
    <nav className='bg-gray-900 w-screen h-14 text-white flex justify-between items-center'>
      <Link to='/' className='text-xl font-bold mx-4'>
        Collab Task Manager
      </Link>
      <ul className='flex space-x-4 mr-4'>
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
        <li>
          <Link to='/task'>Tasks</Link>
        </li>
        <li>
          <Link to='/teams'>Teams</Link>
        </li>
        <li>
          <Link to='/dashboard'>Dashboard</Link>
        </li>
        <button onClick={handleLogout}>Logout</button>
      </ul>
    </nav>
  );
};

export default Navbar;
