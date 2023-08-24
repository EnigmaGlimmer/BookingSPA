const { APIClient } = require('../api_helper');
const url = require('../url_helper');

const api = new APIClient();

export const getServiceList = (request, config) => {
    const axiosInstance = api.get(url.GET_SERVICE, request, config);
    return axiosInstance;
};

export const postService = (body) => {
    const axiosInstance = api.create(url.POST_SERVICE, body);
    return axiosInstance;
};
export const deleteService = (id) => {
    const axiosInstance = api.delete(`${url.DELETE_SERVICE}/${id}`);
    return axiosInstance;
};
