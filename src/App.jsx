import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Registration from './pages/Auth/Registration';
import Profile from './pages/Client/Profile';
import Task from './pages/Client/Task';
import Team from './pages/Client/Team';
import Dashboard from './pages/Client/Dashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/task' element={<Task />} />
        <Route path='/teams' element={<Team />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
