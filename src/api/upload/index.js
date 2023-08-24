const { APIClient } = require('../api_helper');
const url = require('../url_helper');
const { serialize } = require('object-to-formdata');

const api = new APIClient();

export const getAssets = (request, config) => {
    return api.get(url.GET_ASSET_LIST, request, config);
};

export const getAsset = (id, request, config) => {
    return api.get(`${url.GET_ASSET}/${id}`, request, config);
};

export const postAsset = (body, config) => {
    const formData = serialize(body);

    return api.create(url.POST_ASSET, formData, {
        ...config,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const putAsset = (id, body, config) => {
    return api.put(url.PUT_ASSET, body);
};

export const deleteAsset = (id) => {
    return api.delete(`${url.DELETE_ASSET}/${id}`);
};
