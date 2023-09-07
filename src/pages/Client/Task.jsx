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
            Go back
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
    createdBy: JSON.parse(localStorage.getItem('authenticatedUser')).username,
  });

  const [validationError, setValidationError] = useState('');

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
      createdBy: JSON.parse(localStorage.getItem('authenticatedUser')).username,
    });
    setValidationError('');
    window.location.reload();
  };

  useEffect(() => {
    getAllTask();
  }, []);

  const getAllTask = () => {
    try {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      setAllTask(tasks);

      console.log(tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (taskId) => {
    deleteTask(taskId);
  };

  return (
    <>
      <Navbar />
      <div className='p-4 border border-gray-300 rounded-lg shadow-md'>
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
        <input
          className='w-full border border-gray-300 rounded-md px-3 py-2 mb-4'
          type='text'
          placeholder='Team Name'
          value={task.teamName}
          onChange={(e) => setTask({ ...task, teamName: e.target.value })}
          required
        />
        <div className='text-red-500 text-sm'>{validationError}</div>
        <button
          onClick={handleCreateTask}
          className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md'>
          Create Task
        </button>

        <h2 className='text-xl font-semibold mt-10 mb-4'>All Tasks</h2>
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
              {allTask.map((item, index) => (
                <tr
                  key={index}
                  className='hover:bg-gray-100 transition duration-300 ease-in-out'>
                  <td className='py-3 px-4'>{item.title}</td>
                  <td className='py-3 px-4'>{item.description}</td>
                  <td className='py-3 px-4'>{item.priority}</td>
                  <td className='py-3 px-4'>{item.dueDate}</td>
                  <td className='py-3 px-4'>{item.teamName}</td>
                  <td className='py-3 px-4'>{item.status}</td>
                  <td className='py-3 px-4 flex flex-col'>
                    <button
                      className='text-green-500 hover:underline'
                      onClick={() => updateTask(item.id, 'completed')}>
                      Mark as Complete
                    </button>
                    <button
                      className='text-yellow-500 hover:underline'
                      onClick={() => updateTask(item.id, 'in progress')}>
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
