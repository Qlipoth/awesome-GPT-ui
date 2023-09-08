import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-gray-500">
        <FaSpinner className="animate-spin text-4xl" />
      </div>
    </div>
  );
};

export default Loader;
