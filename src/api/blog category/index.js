const { APIClient } = require('../api_helper');
const url = require('../url_helper');

const api = new APIClient();

export const getCategoryList = (request) => {
    return api.get(url.GET_CATEGORY_LIST, request);
};

export const postCategory = () => {
    return api.create(url.POST_NEW_CATEGORY);
};

export const putCategory = (body, config) => {
    return api.put(url.PUT_CATEGORY, body);
};
