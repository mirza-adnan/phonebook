import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    return axios.get(baseUrl).then((response) => response.data);
};

const create = (newObj) => {
    return axios.post(baseUrl, newObj).then((response) => response.data);
};

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
};

const replaceNumber = (id, newObj) => {
    return axios.put(`${baseUrl}/${id}`, newObj);
};

export default {
    getAll,
    create,
    deletePerson,
    replaceNumber,
};
