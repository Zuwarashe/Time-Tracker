import React, { useState, useEffect } from 'react';
import Timer from './Components/Timer';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';
import { useTheme } from './Context/ThemeContext';

export default function App() {
  // Initialize from localStorage
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('time-tracker-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('time-tracker-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    const name = prompt("New task name:");
    const hours = prompt("New hours:");
    if (name && hours > 0) {
      const updated = [...tasks];
      updated[index] = { name, hours: Number(hours) };
      setTasks(updated);
    }
  };

  const { toggleTheme, theme } = useTheme();

  return (
    <div className="app-container">
      <button onClick={toggleTheme} className="toggle-button">
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      <Timer />
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
    </div>
  );
}
