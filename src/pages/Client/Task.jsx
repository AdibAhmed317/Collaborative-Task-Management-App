import React, { useEffect, useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import DatePicker from 'react-datepicker';
import Navbar from '../../components/Navbar';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';

const Task = () => {
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
            Go back to Login Page
          </Link>
        </div>
      </>
    );
  }

  const { createTask, deleteTask, updateTask } = useTaskContext();

  const [allTask, setAllTask] = useState([]);
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'low',
    dueDate: new Date(),
    teamName: '',
    status: 'pending',
    createdBy: authenticatedUser.username,
  });

  const [validationError, setValidationError] = useState('');
  const [userTeams, setUserTeams] = useState([]);
  const [teamNames, setTeamNames] = useState([]);

  const handleCreateTask = () => {
    if (!task.title || !task.teamName || !task.description) {
      setValidationError('Please fill in all required fields.');
      return;
    }

    createTask(task);

    setTask({
      title: '',
      description: '',
      priority: 'low',
      dueDate: new Date(),
      teamName: '',
      status: 'pending',
      createdBy: authenticatedUser.username,
    });
    setValidationError('');
    window.location.reload();
  };

  useEffect(() => {
    getAllTask();
    getUserTeams();
    getTeamNamesFromLocalStorage();
  }, []);

  const getAllTask = () => {
    try {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      setAllTask(tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserTeams = () => {
    const teams = JSON.parse(localStorage.getItem('teams')) || [];
    const userTeams = teams.filter((team) =>
      team.members.includes(authenticatedUser.username)
    );
    setUserTeams(userTeams);
  };

  const getTeamNamesFromLocalStorage = () => {
    const teams = JSON.parse(localStorage.getItem('teams')) || [];
    const names = teams.map((team) => team.name);
    setTeamNames(names);
  };

  const handleDelete = (taskTitle) => {
    deleteTask(taskTitle);
  };

  function formatDateString(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    return `${year}-${month}-${day} ${formattedHours}:${minutes} ${ampm}`;
  }

  return (
    <>
      <Navbar />
      <div className='p-4 border border-gray-300 rounded-lg shadow-md'>
        <h2 className='text-xl font-medium mb-4'>
          Logged in as {authenticatedUser.username}
        </h2>
        <h2 className='text-4xl font-semibold mb-4'>Team Based Task List</h2>
        <h2 className='text-xl font-semibold mb-4'>Create Task</h2>
        <input
          className='w-full border border-gray-300 rounded-md px-3 py-2 mb-4'
          type='text'
          placeholder='Task Title'
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
        />
        <textarea
          className='w-full border border-gray-300 rounded-md px-3 py-2 mb-4'
          placeholder='Task Description'
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <div className='mb-4'>
          <label className='block text-sm font-semibold' htmlFor='priority'>
            Priority:
          </label>
          <select
            id='priority'
            className='w-full border border-gray-300 rounded-md px-3 py-2'
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-semibold' htmlFor='dueDate'>
            Due Date:
          </label>
          <DatePicker
            id='dueDate'
            selected={task.dueDate}
            onChange={(date) => setTask({ ...task, dueDate: date })}
            className='w-full border border-gray-300 rounded-md px-3 py-2'
          />
        </div>
        <select
          className='w-full border border-gray-300 rounded-md px-3 py-2 mb-4'
          value={task.teamName}
          onChange={(e) => setTask({ ...task, teamName: e.target.value })}
          required>
          <option value='' disabled>
            Select Team (create new team if there isn't any)
          </option>
          {teamNames.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
        <div className='text-red-500 text-sm'>{validationError}</div>
        <button
          onClick={handleCreateTask}
          className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md'>
          Create Task
        </button>

        <h2 className='text-xl font-semibold mt-10 mb-4'>Your Tasks</h2>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white rounded-lg overflow-hidden'>
            <thead className='bg-gray-200 text-gray-700'>
              <tr>
                <th className='py-3 px-4 font-semibold text-sm'>Title</th>
                <th className='py-3 px-4 font-semibold text-sm'>Description</th>
                <th className='py-3 px-4 font-semibold text-sm'>Priority</th>
                <th className='py-3 px-4 font-semibold text-sm'>Due Date</th>
                <th className='py-3 px-4 font-semibold text-sm'>Team Name</th>
                <th className='py-3 px-4 font-semibold text-sm'>Status</th>
                <th className='py-3 px-4 font-semibold text-sm'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-gray-600 text-center'>
              {allTask
                .filter((task) =>
                  userTeams.some((team) => team.name === task.teamName)
                )
                .map((item, index) => (
                  <tr
                    key={index}
                    className='hover:bg-gray-100 transition duration-300 ease-in-out'>
                    <td className='py-3 px-4'>{item.title}</td>
                    <td className='py-3 px-4'>{item.description}</td>
                    <td className='py-3 px-4'>{item.priority}</td>
                    <td className='py-3 px-4'>
                      {formatDateString(item.dueDate)}
                    </td>
                    <td className='py-3 px-4'>{item.teamName}</td>
                    <td className='py-3 px-4'>{item.status}</td>
                    <td className='py-3 px-4 flex flex-col'>
                      <button
                        className='text-green-500 hover:underline'
                        onClick={() => updateTask(item.title, 'completed')}>
                        Mark as Complete
                      </button>
                      <button
                        className='text-yellow-500 hover:underline'
                        onClick={() => updateTask(item.title, 'in progress')}>
                        Mark as In Progress
                      </button>
                      <button
                        className='text-red-500 hover:underline'
                        onClick={() => handleDelete(item.title)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Task;
