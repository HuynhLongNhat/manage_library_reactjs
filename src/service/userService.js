import axios from "axios";

const registerNewUser = (data) => {
    return axios.post("http://localhost:8080/register", data);
};
const loginUser = (data) => {
    return axios.post("http://localhost:8080/login", data);
};

const fetchAllStaff = () => {
    return axios.get("http://localhost:8080/staff/read");
};

const createStaff = (data) => {
    return axios.post("http://localhost:8080/staff/create", data);
};

const updateStaff = (data) => {
    return axios.put("http://localhost:8080/staff/update", { ...data });
};

const deleteStaff = (data) => {
    return axios.delete("http://localhost:8080/staff/delete", {
        data: {
            id: data.id
        }
    });
};


const fetchAllReader = () => {
    return axios.get("http://localhost:8080/reader/read");
};

const createReader = (data) => {
    return axios.post("http://localhost:8080/reader/create", data);
};

const updateReader = (data) => {
    return axios.put("http://localhost:8080/reader/update", { ...data });
};

const deleteReader = (data) => {
    return axios.delete("http://localhost:8080/reader/delete", {
        data: {
            id: data.id
        }
    });
};

const fetchAllBook = () => {
    return axios.get("http://localhost:8080/book/read");
};

const createBook = (data) => {
    return axios.post("http://localhost:8080/book/create", data);
};

const updateBook = (data) => {
    return axios.put("http://localhost:8080/book/update", { ...data });
};

const deleteBook = (data) => {
    return axios.delete("http://localhost:8080/book/delete", {
        data: {
            id: data.id
        }
    });
};

const createRequest = (data) => {
    return axios.post("http://localhost:8080/request/create", data);
};

const getAllRequest = () => {
    return axios.get("http://localhost:8080/request/read");
};

export {
    registerNewUser,
    loginUser,
    createStaff,
    fetchAllStaff,
    updateStaff,
    deleteStaff,
    fetchAllReader,
    createReader,
    updateReader,
    deleteReader,
    fetchAllBook,
    createBook,
    updateBook,
    deleteBook,
    createRequest,
    getAllRequest
}