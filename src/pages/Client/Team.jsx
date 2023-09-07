import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';

const Team = () => {
  const [teamName, setTeamName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]); // Initialize as an empty array
  const userList = JSON.parse(localStorage.getItem('userList'));
  const authenticatedUser = JSON.parse(
    localStorage.getItem('authenticatedUser')
  );

  // Function to handle user selection
  const handleUserSelection = (e) => {
    const userId = e.target.value;

    if (userId === '') {
      // Skip empty values
      return;
    }

    // Check if the user is already in the selectedUsers array
    if (selectedUsers.includes(userId)) {
      // User is already selected, so remove them
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      // User is not selected, so add them
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Function to handle team creation
  const handleCreateTeam = () => {
    if (!teamName) {
      // Ensure team name is provided
      alert('Please enter a team name.');
      return;
    }

    // Create a new team object
    const newTeam = {
      name: teamName,
      createdBy: authenticatedUser.username,
      members: selectedUsers, // Include selected users in the team
    };

    // Retrieve existing teams from local storage (if any)
    const teams = JSON.parse(localStorage.getItem('teams')) || [];

    // Add the new team to the list
    teams.push(newTeam);

    // Update the teams in local storage
    localStorage.setItem('teams', JSON.stringify(teams));

    // Reset the input fields and selected users
    setTeamName('');
    setSelectedUsers([]);

    // Optionally, you can display a success message or redirect to another page
    alert('Team created successfully!');
  };

  const [userTeams, setUserTeams] = useState([]);

  useEffect(() => {
    // Retrieve all teams from local storage
    const allTeams = JSON.parse(localStorage.getItem('teams')) || [];

    // Filter teams to find those where the authenticated user is a member
    const teamsForMember = allTeams.filter((team) =>
      team.members.includes(authenticatedUser.username)
    );

    // Set the userTeams state with the filtered teams
    setUserTeams(teamsForMember);
  }, [authenticatedUser]);

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
          <select
            multiple
            className='w-full border border-gray-300 rounded-md px-3 py-2'
            onChange={handleUserSelection}
            value={selectedUsers}>
            {userList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <div className='text-red-500 text-sm'></div>
        <button
          onClick={handleCreateTeam}
          className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md'>
          Create Team
        </button>

        <h2 className='text-xl font-semibold mt-10 mb-4'>Your Teams</h2>
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
