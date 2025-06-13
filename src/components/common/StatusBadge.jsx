import React from 'react';

const statusClasses = {
  success: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-red-100 text-red-800',
};

export function StatusBadge({ status }) {
  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        statusClasses[status] || 'bg-gray-100 text-gray-800'
      }`}
    >
      {getStatusText(status)}
    </span>
  );
}