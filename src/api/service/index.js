const { APIClient } = require('../api_helper');
const url = require('../url_helper');

const api = new APIClient();

export const getServiceList = (request, config) => {
    const axiosInstance = api.get(url.GET_SERVICE, request, config);
    return axiosInstance;
};

export const getSingleService = (id, config) => {
    return api.get(`${url.GET_SERVICE}/${id}`, null, config);
};

export const getBlogOfService = (id, config) => {
    return api.get(`${url.GET_BLOG_SERVICE}/${id}`, null, config);
};

export const postService = (body) => {
    const axiosInstance = api.create(url.POST_SERVICE, body);
    return axiosInstance;
};

export const putService = (id, body, config) => {
    return api.put(`${url.PUT_SERVICE}/${id}`, body, config);
};

export const putBlogOfService = (id, body, config) => {
    return api.put(`${url.PUT_BLOG_OF_SERVICE}/${id}`, body, config);
};

export const deleteService = (id) => {
    const axiosInstance = api.delete(`${url.DELETE_SERVICE}/${id}`);
    return axiosInstance;
};
