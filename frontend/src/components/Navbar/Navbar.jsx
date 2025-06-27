import React from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold text-gray-900">
          API <span className="logo-gradient">Replica</span>
        </h1>
        {location.pathname === "/" ? (
          <button
            id="create-btn"
            className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Create
          </button>
        ):(
          <button
            id="create-btn"
            className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition-transform transform hover:scale-105"
            onClick={() => window.history.back()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
