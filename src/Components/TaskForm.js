import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

export default function TaskForm({ onAdd }) {
  // Local state for task name and hours
  const [name, setName] = useState('');
  const [hours, setHours] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || hours <= 0) return; // Basic validation
    onAdd({ name, hours: Number(hours) }); // Pass new task to parent
    setName(''); // Clear inputs
    setHours('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {/* Task name input */}
      <input
        type="text"
        value={name}
        placeholder="Task name"
        onChange={(e) => setName(e.target.value)}
        className="input"
      />

      {/* Hours input */}
      <input
        type="number"
        value={hours}
        placeholder="Hours"
        onChange={(e) => setHours(e.target.value)}
        className="input short"
      />

      {/* Submit button with plus icon */}
      <button type="submit" className="add-button">
        <FiPlus />
      </button>
    </form>
  );
}
