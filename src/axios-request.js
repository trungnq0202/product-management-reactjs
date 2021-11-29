import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/'
    // baseURL: 'http://18.118.215.192/api/'
});

export default instance;