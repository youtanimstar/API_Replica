const host = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
const version = import.meta.env.VITE_API_VERSION || "v1";
const apiFull = `${host}/${version}`;

const getAllApisOfUser = `${apiFull}/get/all/apis/user`;
const createNewApi = `${apiFull}/create/api`;

const createNewEndpoint = `${apiFull}/create/endpoint`;
const getAllEndpoints = `${apiFull}/get/all/endpoints`;

const updateDataToEndpoint = `${apiFull}/add/data`;


const api = {
    host,
    getAllApisOfUser,
    createNewApi,
    createNewEndpoint,
    getAllEndpoints,
    updateDataToEndpoint,
};

export default api;

