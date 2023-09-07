import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TaskUpdate = ({ task, onUpdate, onDelete }) => {
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleUpdateTask = () => {
    // Perform the update action
    onUpdate(updatedTask);
  };

  const handleDeleteTask = () => {
    // Perform the delete action
    onDelete(task.id);
  };

  return (
    <div className='p-4 border border-gray-300 rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold mb-4'>Update Task</h2>
      <input
        className='w-full border border-gray-300 rounded-md px-3 py-2 mb-4'
        type='text'
        placeholder='Task Title'
        value={updatedTask.title}
        onChange={(e) =>
          setUpdatedTask({ ...updatedTask, title: e.target.value })
        }
        required
      />
      <textarea
        className='w-full border border-gray-300 rounded-md px-3 py-2 mb-4'
        placeholder='Task Description'
        value={updatedTask.description}
        onChange={(e) =>
          setUpdatedTask({ ...updatedTask, description: e.target.value })
        }
      />
      <div className='mb-4'>
        <label className='block text-sm font-semibold' htmlFor='priority'>
          Priority:
        </label>
        <select
          id='priority'
          className='w-full border border-gray-300 rounded-md px-3 py-2'
          value={updatedTask.priority}
          onChange={(e) =>
            setUpdatedTask({ ...updatedTask, priority: e.target.value })
          }>
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
          selected={updatedTask.dueDate}
          onChange={(date) => setUpdatedTask({ ...updatedTask, dueDate: date })}
          className='w-full border border-gray-300 rounded-md px-3 py-2'
        />
      </div>
      <input
        className='w-full border border-gray-300 rounded-md px-3 py-2 mb-4'
        type='text'
        placeholder='Team Name'
        value={updatedTask.teamName}
        onChange={(e) =>
          setUpdatedTask({ ...updatedTask, teamName: e.target.value })
        }
        required
      />
      <div className='text-red-500 text-sm'>{validationError}</div>
      <div className='flex justify-between'>
        <button
          onClick={handleUpdateTask}
          className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md'>
          Update Task
        </button>
        <button
          onClick={handleDeleteTask}
          className='bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md'>
          Delete Task
        </button>
      </div>
    </div>
  );
};

export default TaskUpdate;
