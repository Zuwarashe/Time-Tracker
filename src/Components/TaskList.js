import React from 'react';

export default function TaskList({ tasks, onEdit, onDelete }) {
  const totalHours = tasks.reduce((sum, task) => sum + task.hours, 0);

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task, i) => (
          <li key={i} className="task-entry">
            <span>{task.name} – {task.hours}h</span>
            <div className="task-buttons">
              <button className="edit-button" onClick={() => onEdit(i)}>Edit</button>
              <button className="delete-button" onClick={() => onDelete(i)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <p className="total-hours">Total: {totalHours}h</p>
    </div>
  );
}
