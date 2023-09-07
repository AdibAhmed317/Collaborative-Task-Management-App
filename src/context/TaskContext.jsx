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
    try {
      const updatedTasks = JSON.parse(localStorage.getItem('tasks')).map(
        (task) =>
          task.title === taskId ? { ...task, status: newStatus } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  const deleteTask = (taskTitle) => {
    const updatedTasks = tasks.filter((task) => task.title !== taskTitle);
    setTasks(updatedTasks);
    window.location.reload();
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
