import React, { createContext, useContext, useEffect, useState } from 'react';

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const taskStorageKey = 'tasks';

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

  const createTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (taskId, newStatus) => {
    window.location.reload();
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskTitle) => {
    const updatedTasks = tasks.filter((task) => task.title !== taskTitle);
    setTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
