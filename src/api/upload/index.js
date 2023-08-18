const { APIClient } = require('../api_helper');
const url = require('../url_helper');

const api = new APIClient();

export const getAssets = (request, config) => {
    return api.get(url.GET_BLOG_LIST);
};

export const getAsset = (request, config) => {
    return api.get(url.GET_ASSET);
};

export const postAsset = () => {
    return api.create(url.POST_NEW_BLOG);
};

export const putAsset = (body, config) => {
    return api.put(url.PUT_BLOG, body);
};

export const deleteAsset = () => {
    return api.delete(url.DELE);
};
