import axios from 'axios';
import {BASE_URI} from './pathMap';
import Toast from './toast';
import RootStore from '../mobx/index';

const instance = axios.create({
    baseURL: BASE_URI
})

instance.interceptors.request.use((config) => {
    Toast.showLoading('Loading');
    return config;
}, (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    Toast.hideLoading();
    return response.data;
}, (error) => {
    return Promise.reject(error);
});

export default {
    get: instance.get,
    post: instance.post,
    authPost: (url, data={}, options={}) => {
        const token = RootStore.token;
        const headers = options.headers || {};
        return instance.post(url, data, {
            ...options,
            headers: {
                'Authorization': `Bearer ${token}`,
                ...headers
            }
        })
    },
    authGet: (url, data={}, options={}) => {
        const token = RootStore.token;
        const headers = options.headers || {};
        return instance.get(url, {
            ...options,
            params: data,
            headers: {
                'Authorization': `Bearer ${token}`,
                ...headers
            }
        })
    }
}