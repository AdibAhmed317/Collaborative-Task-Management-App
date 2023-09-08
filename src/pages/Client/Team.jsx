import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';

const Team = () => {
  const [teamName, setTeamName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userTeams, setUserTeams] = useState([]);
  const userList = JSON.parse(localStorage.getItem('userList'));
  const authenticatedUser = JSON.parse(
    localStorage.getItem('authenticatedUser')
  );

  if (!authenticatedUser || !authenticatedUser.username) {
    return (
      <>
        <Navbar />
        <div className='text-center mt-10'>
          Login First
          <Link className='p-5 bg-blue-300 rounded-xl ml-10' to='/'>
            Go back to login page
          </Link>
        </div>
      </>
    );
  }

  useEffect(() => {
    const allTeams = JSON.parse(localStorage.getItem('teams')) || [];

    const teamsForMember = allTeams.filter((team) =>
      team.members.includes(authenticatedUser.username)
    );

    setUserTeams(teamsForMember);
  }, [authenticatedUser]);

  const handleCreateTeam = () => {
    if (!teamName) {
      alert('Please enter a team name.');
      return;
    }

    const newTeam = {
      name: teamName,
      createdBy: authenticatedUser.username,
      members: selectedUsers,
    };

    const teams = JSON.parse(localStorage.getItem('teams')) || [];

    teams.push(newTeam);
    localStorage.setItem('teams', JSON.stringify(teams));

    setTeamName('');
    setSelectedUsers([]);

    alert('Team created successfully!');
  };

  const handleChange = (e, index) => {
    const activeData = document.getElementById(index).checked;

    if (activeData == true) {
      setSelectedUsers((oldData) => [...oldData, e.target.value]);
    }
  };

  return (
    <>
      <Navbar />
      <div className='p-4 border border-gray-300 rounded-lg shadow-md'>
        <h2 className='text-xl font-semibold mb-4'>
          Logged in as {authenticatedUser.username}
        </h2>

        <h2 className='text-xl font-semibold mb-4'>Create Team</h2>
        <input
          className='w-full border border-gray-300 rounded-md px-3 py-2 mb-4'
          type='text'
          placeholder='Team Name'
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        <div className='mb-4'>
          <h3 className='text-lg font-semibold mb-2'>Add Members:</h3>
          {userList.map((user, index) => (
            <div key={index}>
              <input
                id={index}
                type='checkbox'
                value={user.username}
                onChange={(e) => handleChange(e, index)}
              />
              <span>{user.username}</span>
            </div>
          ))}
        </div>
        <div className='text-red-500 text-sm'></div>
        <button
          onClick={handleCreateTeam}
          className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md'>
          Create Team
        </button>

        <h2 className='text-xl font-semibold mt-10 mb-4'>My Teams</h2>
        <ul>
          {userTeams.map((team) => (
            <li key={team.name}>{team.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Team;
