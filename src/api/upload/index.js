const { APIClient } = require('../api_helper');
const url = require('../url_helper');

const api = new APIClient();

export const getAssets = (request, config) => {
    return api.get(url.GET_ASSET_LIST, request, config);
};

export const getAsset = (id, request, config) => {
    return api.get(`${url.GET_ASSET}/${id}`, request, config);
};

export const postAsset = (body, config) => {
    return api.create(url.POST_ASSET);
};

export const putAsset = (id, body, config) => {
    return api.put(url.PUT_ASSET, body);
};

export const deleteAsset = (id) => {
    return api.delete(`${url.DELETE_ASSET}/${id}`);
};
