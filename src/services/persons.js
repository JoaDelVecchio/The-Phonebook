import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

// Fetch all persons from the server
const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

// Create a new person entry on the server
const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data);
};

// Update an existing person entry on the server
const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
};

// Remove a person entry from the server
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

export default { getAll, create, update, remove };
