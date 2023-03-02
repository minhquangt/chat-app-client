import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://chat-app-server-peach-theta.vercel.app/api',
});

export default axiosClient;
