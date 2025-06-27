import { useState, useEffect } from "react";
import api from "../../apis";
import Card from "./Card";
import axios from "axios";

const Home = () => {
  const userId = "80f62c28-0f41-4501-9daf-0081b6f67a67"; // Replace with actual user ID or fetch dynamically
  const [showModal, setShowModal] = useState(false);
  const [apiName, setApiName] = useState("");
  const [description, setDescription] = useState("");

  const [apis, setApis] = useState([]);

  const [modalLoading, setModalLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const getApisData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(api.getAllApisOfUser, {
        user_id: userId,
      });
      const data = response.data;

      setApis(data || []);
    } catch (error) {
      console.error("Error fetching APIs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateApi = async () => {
    if (!apiName || !description) {
      alert("Please enter both API name and description.");
      return;
    }
    setModalLoading(true);
    try {
      const response = await axios.post(api.createNewApi, {
        name: apiName,
        description: description,
        user_id: "80f62c28-0f41-4501-9daf-0081b6f67a67",
      });
      console.log("API created successfully:", response.data);
      setShowModal(false);
      setApiName("");
      setDescription("");
      getApisData(); // Refresh the API list
    } catch (error) {
      console.error("Error creating API:", error);
    } finally {
      setModalLoading(false);
      setShowModal(false); // Close the modal after creation
      getApisData(); // Refresh the API list
    }
  };

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

  useEffect(() => {
    if (!showModal) return;
    const modalBackground = document.getElementById("modalBackground");
    if (modalBackground) {
      const handleClick = (e) => {
        if (e.target === modalBackground) {
          setShowModal(false);
        }
      };
      modalBackground.addEventListener("click", handleClick);
      return () => {
        modalBackground.removeEventListener("click", handleClick);
      };
    }
  }, [showModal]);

  useEffect(() => {
    getApisData();
  }, []);

  return (
    <>
      {/* Navbar */}
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
          ) : apis.length > 0 ? (
            <div className="cardContainer">
              {apis.map((api) => (
                <Card
                  key={api.id}
                  title={api.name}
                  description={api.description}
                  apiId={api.id}
                  // Add other props as needed
                />
              ))}
            </div>
          ) : (
            <div className="noApisMessage">
              <h2 className="text-2xl font-semibold text-gray-700">
                No APIs found
              </h2>
              <p className="text-gray-500 mt-2">
                Click the "Create" button to add a new API.
              </p>
            </div>
          )}
        </main>

        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
            id="modalBackground"
          >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md  p-6 relative">
              <button
                className="absolute top-2 right-4 text-gray-400 hover:text-gray-600 text-4xl"
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
                onClick={() =>{ handleCreateApi() }}
                disabled={modalLoading}
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
    </>
  );
};

export default Home;
