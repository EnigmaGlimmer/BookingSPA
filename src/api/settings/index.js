const { APIClient } = require('../api_helper');
const url = require('../url_helper');
const { serialize } = require('object-to-formdata');

const api = new APIClient();

// export const getSettings = (request, config) => {
//     return api.get(url.GET_ASSET_LIST, request, config);
// };

export const getSetting = (request, config) => {
    return api.get(`${url.GET_SETTING}`, request, config);
};

export const postSetting = (body, config) => {
    return api.create(
        url.POST_SETTING,
        {
            ...body,
            body: JSON.stringify(body.body),
        },
        {
            ...config,
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
};

export const putSetting = (request, body, config) => {
    return api.put(url.PUT_ASSET, body, {
        ...config,
        params: request,
    });
};
