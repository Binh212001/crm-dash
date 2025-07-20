import React from "react";

const Logout = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Logout</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Are you sure you want to logout?
          </h2>
          <p className="text-gray-600 mb-6">
            You will be redirected to the login page.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-200">
              Yes, Logout
            </button>
            <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition duration-200">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
