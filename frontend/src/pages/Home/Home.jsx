import { useState, useEffect } from "react";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [apiName, setApiName] = useState("");
  const [description, setDescription] = useState("");

  const [modalLoading, setModalLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  // Attach event handler to the Create button in the header
  useEffect(() => {
    const btn = document.getElementById("create-btn");
    if (btn) {
      btn.onclick = () => setShowModal(true);
    }
    return () => {
      if (btn) btn.onclick = null;
    };
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navbar */}
        <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
            <h1 className="text-3xl font-bold text-gray-900">
              API <span className="logo-gradient">Replica</span>
            </h1>
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
          </div>
        </header>

        <div className="pt-24">
          <main>
            {loading ? (
              <div className="mainLoadingContainer">
                <span className="loader homeLoader">
                  <svg
                    className="custom-spinner"
                    width="80"
                    height="80"
                    viewBox="0 0 50 50"
                  >
                    <circle
                      className="path"
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </div>
            ) : (
              <div className="cardContainer">
                <div className="card">
                  <h2 className="cardTitle">Users api</h2>
                  <p className="cardDescription">Lorem ipsam dolor sit amet.</p>
                </div>
              </div>
            )}
          </main>

          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md  p-6 relative">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h2 className="text-xl font-semibold mb-4">Create New API</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">
                    Enter API Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={apiName}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Only allow lowercase letters, numbers, and underscores
                      const filtered = value.replace(/[^a-z0-9_]/g, "");
                      setApiName(filtered);
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Only lowercase letters, numbers, and underscores allowed.
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">
                    Enter Description
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none textarea_home"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md w-full modalButton"
                  onClick={() => {
                    // Handle create logic here
                    // setShowModal(false);
                    setApiName("");
                    setDescription("");
                  }}
                >
                  {modalLoading ? (
                    <span className="loader">
                      <svg
                        className="custom-spinner"
                        width="24"
                        height="24"
                        viewBox="0 0 50 50"
                      >
                        <circle
                          className="path"
                          cx="25"
                          cy="25"
                          r="20"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  ) : (
                    "Create"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
