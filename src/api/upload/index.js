const { APIClient } = require('../api_helper');
const url = require('../url_helper');

const api = new APIClient();

export const getAssets = (request, config) => {
    return api.get(url.GET_ASSET_LIST);
};

export const getAsset = (request, config) => {
    return api.get(url.GET_ASSET);
};

export const postAsset = () => {
    return api.create(url.POST_ASSET);
};

export const putAsset = (body, config) => {
    return api.put(url.PUT_ASSET, body);
};

export const deleteAsset = () => {
    return api.delete(url.DELETE_ASSET);
};
