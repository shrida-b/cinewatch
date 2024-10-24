import React from 'react';

function Notification({ message, type, onClose }) {
  if (!message) return null;

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg text-white shadow-lg ${type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-xl font-bold">&times;</button>
      </div>
    </div>
  );
}

export default Notification;
