import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../../context/TaskContext';

const Dashboard = () => {
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

  const { tasks, updateTask, deleteTask } = useTaskContext();

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortByDueDate, setSortByDueDate] = useState(null);

  const filteredTasks = tasks
    .filter((task) =>
      filterStatus === 'all' ? true : task.status === filterStatus
    )
    .filter((task) =>
      filterPriority === 'all' ? true : task.priority === filterPriority
    );

  const sortedTasks = [...filteredTasks].sort((taskA, taskB) => {
    if (sortByDueDate === 'asc') {
      return new Date(taskA.dueDate) - new Date(taskB.dueDate);
    } else if (sortByDueDate === 'desc') {
      return new Date(taskB.dueDate) - new Date(taskA.dueDate);
    }
    return 0;
  });

  return (
    <>
      <Navbar />
      <h2 className='text-xl font-semibold mt-10 mb-4 p-5'>
        Logged in as {authenticatedUser.username}
      </h2>

      <div className='mb-4 p-5'>
        <label className='block text-sm font-semibold' htmlFor='filterStatus'>
          Filter by Status:
        </label>
        <select
          id='filterStatus'
          className='w-full border border-gray-300 rounded-md px-3 py-2'
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}>
          <option value='all'>All</option>
          <option value='completed'>Completed</option>
          <option value='in progress'>In Progress</option>
          <option value='pending'>Pending</option>
        </select>
      </div>

      <div className='mb-4 p-5'>
        <label className='block text-sm font-semibold' htmlFor='filterPriority'>
          Filter by Priority:
        </label>
        <select
          id='filterPriority'
          className='w-full border border-gray-300 rounded-md px-3 py-2'
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}>
          <option value='all'>All</option>
          <option value='low'>Low</option>
          <option value='medium'>Medium</option>
          <option value='high'>High</option>
        </select>
      </div>

      <button
        onClick={() => setSortByDueDate('desc')}
        className='bg-green-500 hover:bg-green-600 text-white font-semibold px-2 py-2 rounded-md m-2'>
        Sort by Due Date (High to Low)
      </button>
      <button
        onClick={() => setSortByDueDate('asc')}
        className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-2 py-2 rounded-md m-2'>
        Sort by Due Date (Low to High)
      </button>

      <h2 className='text-xl font-semibold mt-4 mb-2 p-5'>All Tasks</h2>
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
            {sortedTasks.map((item, index) => (
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
                    onClick={() => deleteTask(item.title)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
