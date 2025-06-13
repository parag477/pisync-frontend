import React from 'react';
import { useDevices } from '../hooks/useDevices';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export function ErrorLogsPage() {
  const { errorLogs, loading, error } = useDevices();

  if (loading && !errorLogs.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Error loading error logs: {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Error Logs
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Recent error logs from all devices
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Device ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Error Message
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Last Attempt
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {errorLogs.map((log, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {log.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                  <div className="bg-red-50 p-3 rounded-md">
                    <code className="text-red-700 text-xs break-words">
                      {log.message}
                    </code>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {(() => {
                    const date = new Date(log.timestamp);
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = date.toLocaleString('en-GB', { month: 'short' });
                    const year = date.getFullYear();
                    return `${day}-${month}-${year}`;
                  })()}
                </td>
              </tr>
            ))}
            {errorLogs.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No error logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}