import axios from 'axios';

const instance = axios.create({
    baseURL: "https://tiktok-mern-backend012.herokuapp.com/",
});

export default instance;