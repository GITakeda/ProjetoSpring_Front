import axios from 'axios';

const httpService = axios.create({
    baseURL: 'http://192.168.0.46:8081'
})

export default httpService;