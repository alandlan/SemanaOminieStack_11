import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backendbehero.herokuapp.com/'
});

export default api;