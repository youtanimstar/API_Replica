import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import EndPointCard from "./EndPointCard";
import axios from "axios";
import api from "../../apis";
import JsonEditor from "./JsonEditor";
// import JsonView from "@uiw/react-json-view";
// import { vscodeTheme } from "@uiw/react-json-view/vscode";
// import JsonEditor from "./JsonEditor";

const EditApi = () => {
  const userId = "80f62c28-0f41-4501-9daf-0081b6f67a67";
  const { apiId, apiName } = useParams(); // Assuming you're using react-router for routing
  const [showModal, setShowModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false); // State for loading indicator
  const [updateLoading,setUpdateLoading] = useState(false); // State for loading indicator
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [endpoints, setEndpoints] = useState([]); // State to hold API data
  const [apiPath, setApiPath] = useState("");
  // const [apiData, setApiData] = useState([]);
  const [selectIndex, setSelectIndex] = useState(0);
  const [apiGetData, setApiGetData] = useState({
    message: "Please select an endpoint to view data.",
  }); // State to hold API GET data
  const [inputData, setInputData] = useState(`{}`);
  const [inputPath, setInputPath] = useState("");
  const modalRef = useRef(null);

  const createNewEndpoint = async () => {
    setAddLoading(true);
    try {
      console.log(
        "Creating new endpoint for API:",
        apiId,
        "with path:",
        apiPath
      );

      const normalizedPath = apiPath.startsWith("/") ? apiPath : "/" + apiPath;
      const response = await axios.post(api.createNewEndpoint, {
        path: normalizedPath,
        api_id: apiId,
      });

      if (response.status != 201) {
        console.error("Failed to add endpoint:", response.data);
        alert("Failed to add endpoint. Please try again.");
      }

      // Simulate a delay for the loading state
      setTimeout(() => {
        setAddLoading(false);
        setShowModal(false); // Close modal after adding
        setApiPath("");
      }, 2000);
    } catch (error) {
      console.error("Error creating new endpoint:", error);
      setAddLoading(false);
      alert(
        error.response?.data?.message ||
          "Failed to create endpoint. Please try again."
      );
    } finally {
      setLoading(true);
      getAllEndpoints(); // Refresh the list of endpoints after adding a new one
      setLoading(false);
    }
  };
  const getAllEndpoints = async () => {
    try {
      setLoading(true);
      const response = await axios.post(api.getAllEndpoints, {
        api_id: apiId,
      });
      const data = response.data;
      setEndpoints(data || []);
      setInputPath(data[0]?.path || ""); // Set initial input path to the first endpoint's path
    } catch (error) {
      console.error("Error fetching endpoints:", error);
      alert(
        error.response?.data?.message ||
          "Failed to fetch endpoints. Please try again."
      );
      setInputPath(""); 
    } finally {
      setLoading(false);
    }
  };
  // Handler for input change with validation
  const handleInputChange = (e) => {
    let value = e.target.value;

    // Only allow lowercase letters, numbers, underscores, and slashes
    value = value.replace(/[^a-z0-9_\/]/g, "");

    // Prevent deleting the initial "/users/"

    setApiPath(value);
  };

  const getApiData = async () => {
    if (endpoints.length === 0) {
      // alert("Please select an endpoint first.");
      return;
    }
    const selectedEndpoint = endpoints[selectIndex];
    if (!selectedEndpoint) {
      // alert("No endpoint selected.");
      return;
    }

    const completeURL = `${
      api.host
    }/custom/${userId}/${selectedEndpoint.method.toLowerCase()}/${apiName.toLowerCase()}${
      selectedEndpoint.path
    }`;

    // console.log(completeURL);
    

    try {
      const response = await axios.get(completeURL);
      setApiGetData(response.data);
      // console.log("API GET Data:", response.data);
    } catch (error) {
      console.error("Error fetching API data:", error);

      setApiGetData(error.response?.data);
      // alert(
      //   error.response?.data?.message ||
      //     "Failed to fetch API data. Please try again."
      // );
    }
  };

  const updateDataToEndpoint = async () => {
    setUpdateLoading(true);
    try {
      const selectedEndpoint = endpoints[selectIndex];
      console.log(selectedEndpoint);
      
      // if (!selectedEndpoint) {
      //   alert("Please select an endpoint first.");
      //   setUpdateLoading(false);
      //   return;
      // }
      const response = await axios.put(
        api.updateDataToEndpoint,
        {
          path: selectedEndpoint.path,
          newPath: inputPath,
          api_id: selectedEndpoint.api_id,
          format: JSON.parse(inputData),
          type: 1,
          method: "GET",
        }
      );
      if (response.status === 200) {
        console.log("Data updated successfully:", response.data);
        // alert("Data updated successfully.");
        
        
      } else {
        console.error("Failed to update data:", response.data);
        alert("Failed to update data. Please try again.");
        
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert(
        error.response?.data?.message ||
          "Failed to update data. Please try again."
      );
      
    } finally {
      setUpdateLoading(false);
      getAllEndpoints(); // Refresh the list of endpoints after updating
      getApiData(); // Fetch the updated API data
    }
  };

  // Close modal on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);
  // Fetch endpoints when component mounts
  useEffect(() => {
    getAllEndpoints();
  }, [apiId]);

  useEffect(() => {
    if (endpoints.length > 0) {
      getApiData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoints, selectIndex]);

  return (
    <>
      <div className="container mx-auto pt-24">
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">API Paths</h2>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 font-semibold rounded-lg hover:bg-violet-200 transition-colors duration-300 focus:outline-none focus-ring-purple"
                id="add-path-btn"
                onClick={() => setShowModal(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Path
              </button>
            </div>
            {/* ...rest of your code remains unchanged... */}
            <div className="space-y-3 h-full overflow-y-auto px-2 py-5">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <span className="loader endpointLoader">
                    <svg
                      className="custom-spinner"
                      width="50"
                      height="50"
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
              ) : endpoints.length > 0 ? (
                // <div className="cardContainer">
                endpoints.map((endpoint, index) => (
                  <EndPointCard
                    method={endpoint.method}
                    path={endpoint.path}
                    id={endpoint.id}
                    completeURL={`${
                      api.host
                    }/custom/${userId}/${endpoint.method.toLowerCase()}/${apiName.toLowerCase()}${
                      endpoint.path
                    }`}
                    apiName={apiName}
                    key={index}
                    onClick={() => {
                      setSelectIndex(index);
                      setInputData("{}");
                      getApiData();
                      setInputPath(endpoint.path);
                    }}
                    selected={selectIndex === index ? true : false}
                  />
                ))
              ) : (
                // </div>
                <div className="noApisMessage">
                  <h2 className="text-xl font-semibold text-gray-700">
                    No Endpoints Found
                  </h2>
                  <p className="text-gray-500 mt-2">
                    Click the "Add Path" button to add a new endpoint.
                  </p>
                </div>
              )}

              {/* <EndPointCard /> */}
            </div>
          </div>
          {/* ...rest of your code remains unchanged... */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-2 border-2 border-violet-400 rounded-xl bg-white shadow-sm">
              <div className="relative">
                <select className="appearance-none font-semibold text-green-600 rounded-lg px-4 py-3 focus:outline-none focus-ring-purple border-collapse border border-gray-300">
                  <option>GET</option>
                </select>
              </div>
              <input
                type="text"
                value={inputPath}
                onChange={(e) => setInputPath(e.target.value)}
                className="w-full bg-transparent p-3 text-lg text-gray-700 focus:outline-none"
              />
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md modalButton"
                onClick={() => {
                  // createNewEndpoint();
                  updateDataToEndpoint();
                }}
                disabled={updateLoading}
              >
                {updateLoading ? (
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
                  "Update"
                )}
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <button className="px-4 py-1.5 rounded-md bg-gray-100 font-semibold text-gray-800">
                  Custom
                </button>
              </div>

              {/* <textarea
                className="w-full h-[280px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-violet-400"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
              /> */}

              <JsonEditor 
                inputValue={inputData}
                setInputValue={setInputData}

              />

              {/* <textarea
                className="w-full h-[280px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-violet-400 mt-4"
                value={JSON.stringify(apiGetData, null, 2)}
                readOnly
              /> */}

              <div className=" mt-8"></div>

              <JsonEditor 
                inputValue={JSON.stringify(apiGetData,null,2)}
                setInputValue={()=>{}}
                

              />
            </div>
          </div>
        </main>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative"
          >
            {/* Close Icon */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="text-lg font-semibold mb-4">Add New Path</h3>
            <div className=" flex flex-row gap-0 mb-6">
              <div className=" border-2 border-violet-300 text-nowrap h-12 p-2 rounded-tl-lg rounded-bl-lg text-black-200 font-semibold flex items-center">
                <span
                  className="text-gray-500 cursor-pointer transition"
                  tabIndex={0}
                  role="link"
                >
                  {apiName}
                </span>
              </div>
              <input
                type="text"
                value={apiPath}
                onChange={handleInputChange}
                placeholder="Enter API path"
                className="w-full border border-gray-300 rounded-lg rounded-tl-none rounded-bl-none px-4 py-2  focus:outline-none  focus:ring-violet-400 h-auto"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md modalButton"
                onClick={() => {
                  createNewEndpoint();
                }}
                disabled={addLoading}
              >
                {addLoading ? (
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
                  "Add"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditApi;
