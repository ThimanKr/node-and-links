import axios from 'axios';
import {store} from '../store';
import {hideLoader, showLoader} from '../models/loaderModel';

const BASE_URL = 'http://localhost:8080/api/1/';
const REQUEST_TIMEOUT = 3600000;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});


axiosInstance.interceptors.response.use(
    (response) => {
        store.dispatch(hideLoader());
        return response;
    },
    (error) => {
            store.dispatch(hideLoader());
        
        if (error.response.status === 401) {
            window.location = '/';
        }
        return Promise.reject(error.response);
    }
);

export default axiosInstance;
