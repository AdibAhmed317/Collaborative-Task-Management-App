import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context for tasks
const TaskContext = createContext();

// Custom hook to access the task context
export const useTaskContext = () => useContext(TaskContext);

// Task context provider component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const taskStorageKey = 'tasks'; // Key for local storage

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(taskStorageKey));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to local storage whenever the tasks array changes
  useEffect(() => {
    localStorage.setItem(taskStorageKey, JSON.stringify(tasks));
  }, [tasks]);

  // Function to create a new task and add it to the tasks array
  const createTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // Function to update an existing task by its ID
  const updateTask = (taskId, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  // Function to delete a task by its ID
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Provide the task context to child components
  return (
    <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
