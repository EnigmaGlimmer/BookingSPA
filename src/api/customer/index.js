const { APIClient } = require('../api_helper');
const url = require('../url_helper');

const api = new APIClient();

export const getCustomerList = (request, config) => {
    const axiosInstance = api.get(url.GET_CUSTOMER, request, config);
    return axiosInstance;
};

export const getCustomer = (request, id) => {
    const axiosInstance = api.get(`${url.GET_CUSTOMER}/${id}`, request);
    return axiosInstance;
};

export const postCustomer = (body) => {
    const axiosInstance = api.create(url.POST_CUSTOMER, body);
    return axiosInstance;
};
export const deleteCustomer = (id) => {
    const axiosInstance = api.delete(`${url.DELETE_CUSTOMER}/${id}`);
    return axiosInstance;
};
