import React, { useState, useEffect } from 'react';
import Timer from './Components/Timer';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';
import Modal from './Components/Modal';
import { useTheme } from './Context/ThemeContext';
import { MdLandscape } from 'react-icons/md';
import { BsSun, BsMoon } from 'react-icons/bs';

import bg1 from './Assets/bg1.jpg';
import bg2 from './Assets/bg2.jpg';
import bg3 from './Assets/bg3.jpg';

// Available background images
const backgrounds = [bg1, bg2, bg3];

export default function App() {
  const [tasks, setTasks] = useState([]);
  const { toggleTheme, theme } = useTheme();

  // Controls which background image is shown
  const [bgIndex, setBgIndex] = useState(0);

  // Modal control states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState({});

  // Load saved tasks from local storage on first render
  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = (task) => setTasks([...tasks, task]);

  // Remove a task by index
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Open modal to edit an existing task
  const editTask = (index) => {
    const task = tasks[index];
    setModalType('edit');
    setModalData({ index, task });
    setModalOpen(true);
  };

  // Trigger modal to save timer result as a task
  const saveTimerSession = (seconds) => {
    setModalType('save');
    setModalData({ seconds });
    setModalOpen(true);
  };

  // Handle modal form submission for both edit and save actions
  const onModalSubmit = (formData) => {
    if (modalType === 'edit') {
      const updated = [...tasks];
      updated[modalData.index] = {
        name: formData.name,
        hours: Number(formData.hours),
      };
      setTasks(updated);
    }

    if (modalType === 'save') {
      const hours = +(modalData.seconds / 3600).toFixed(2);
      const newTask = { name: formData.name, hours };
      setTasks((prev) => [...prev, newTask]);
    }

    setModalOpen(false);
  };

  // Cycle to the next background image
  const changeBackground = () => {
    setBgIndex((prev) => (prev + 1) % backgrounds.length);
  };

  return (
    <div
      className="app-background"
      style={{
        backgroundImage: `url(${backgrounds[bgIndex]})`,
      }}
    >
      <div className="app-container glass">
        {/* Toggle between light and dark theme */}
        <button onClick={toggleTheme} className="theme-button">
          {theme === 'light' ? <BsMoon /> : <BsSun />}
        </button>

        {/* Change background image */}
        <button onClick={changeBackground} className="background-button">
          <MdLandscape />
        </button>

        {/* Main components */}
        <Timer onSave={saveTimerSession} />
        <TaskForm onAdd={addTask} />
        <TaskList tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
      </div>

      {/* Modal for editing or saving tasks */}
      <Modal
        isOpen={modalOpen}
        title={modalType === 'edit' ? 'Edit Task' : 'Save Timer Session'}
        fields={
          modalType === 'edit'
            ? [
                {
                  name: 'name',
                  label: 'Task Name',
                  defaultValue: modalData.task?.name || '',
                },
                {
                  name: 'hours',
                  label: 'Hours Worked',
                  type: 'number',
                  defaultValue: modalData.task?.hours || '',
                },
              ]
            : [
                {
                  name: 'name',
                  label: 'Task Name',
                  defaultValue: '',
                },
              ]
        }
        onCancel={() => setModalOpen(false)}
        onSubmit={onModalSubmit}
      />
    </div>
  );
}
