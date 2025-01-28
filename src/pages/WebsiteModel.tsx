import React, { useState } from 'react';

interface WebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (websiteUrl: string) => void;
}

const WebsiteModal: React.FC<WebsiteModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [website, setWebsite] = useState('');

  const handleSave = () => {
    if (website) {
      onSave(website); // Pass the website URL to the parent component
    }
  };

  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="bg-white p-8 rounded-lg shadow-xl transform transition-all duration-300 ease-in-out w-96"
        style={{
          backgroundColor: 'lightgray',
          width: '650px',
        }}
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Enter Your Website
        </h2>

        <input
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-6"
          placeholder="https://example.com"
        />

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-md transition duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebsiteModal;
