import React, { useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '../../components/Navbar';

const Task = () => {
  const { createTask } = useTaskContext();
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
    if (!task.title || !task.teamName) {
      setValidationError('Please fill in all required fields.');
      return;
    }

    // Call the createTask function from the context to add the task
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
      </div>
    </>
  );
};

export default Task;
