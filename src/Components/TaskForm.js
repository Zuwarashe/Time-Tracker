import React, { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [name, setName] = useState('');
  const [hours, setHours] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || hours <= 0) return;
    onAdd({ name, hours: Number(hours) });
    setName('');
    setHours('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={name}
        placeholder="Task name"
        onChange={(e) => setName(e.target.value)}
        className="input"
      />
      <input
        type="number"
        value={hours}
        placeholder="Hours"
        onChange={(e) => setHours(e.target.value)}
        className="input short"
      />
      <button type="submit" className="add-button">Add</button>
    </form>
  );
}
