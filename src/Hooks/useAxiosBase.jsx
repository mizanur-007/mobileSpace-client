import axios from 'axios';
import React from 'react';

const axiosBase = axios.create({
    baseURL : 'http://localhost:5000',
    withCredentials: true
})

const useAxiosBase = () => {
    return axiosBase
};

export default useAxiosBase;