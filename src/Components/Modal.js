import React from 'react';
import '../Components/Modal.css';

export default function Modal({ isOpen, title, fields, onCancel, onSubmit }) {
  // Don't render modal if it's not open
  if (!isOpen) return null;

  // Gather form values and call submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    fields.forEach((field) => {
      formData[field.name] = e.target[field.name].value;
    });
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Modal title */}
        <h2>{title}</h2>

        {/* Dynamic form fields */}
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="modal-input-group">
              <label>{field.label}</label>
              <input
                name={field.name}
                type={field.type || 'text'}
                defaultValue={field.defaultValue || ''}
                required
                min={field.type === 'number' ? '0' : undefined}
                step={field.type === 'number' ? '0.1' : undefined}
                />
            </div>
          ))}

          {/* Submit and cancel buttons */}
          <div className="modal-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
