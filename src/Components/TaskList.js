import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

export default function TaskList({ tasks, onEdit, onDelete }) {
  // Calculate total hours from all tasks
  const totalHours = tasks.reduce((sum, task) => sum + task.hours, 0);

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task, i) => (
          <li key={i} className="task-entry">
            {/* Display task name and hours */}
            <span>{task.name} – {task.hours}h</span>

            {/* Edit and delete buttons */}
            <div className="task-buttons">
              <button className="edit-button" onClick={() => onEdit(i)}>
                <FiEdit />
              </button>
              <button className="delete-button" onClick={() => onDelete(i)}>
                <FiTrash2 />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Show total time at the bottom */}
      <p className="total-hours">Total: {totalHours}h</p>
    </div>
  );
}
