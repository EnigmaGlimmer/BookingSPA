const { APIClient } = require('../api_helper');
const url = require('../url_helper');

const api = new APIClient();

export const getBlogList = (request, config) => {
    return api.get(url.GET_BLOG_LIST, request, config);
};

export const getSingleBlog = (id, config) => {
    return api.get(`${url.GET_SINGLE_BLOG}/${id}`, null, config);
};

export const postBlog = (body, config) => {
    return api.create(url.POST_NEW_BLOG, body, config);
};

export const putBlog = (id, body, config) => {
    return api.put(`${url.PUT_BLOG}/${id}`, body);
};

export const deleteBlog = (id) => {
    return api.delete(`${url.DELETE_BLOG}/${id}`);
};
