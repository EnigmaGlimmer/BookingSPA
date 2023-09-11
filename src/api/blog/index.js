const { APIClient } = require('../api_helper');
const url = require('../url_helper');

const api = new APIClient();

export const getBlogList = (request, config) => {
    return api.get(url.GET_BLOG_LIST);
};

export const postBlog = (body, config) => {
    return api.create(url.POST_NEW_BLOG, body, config);
};

export const putBlog = (body, config) => {
    return api.put(url.PUT_BLOG, body);
};
