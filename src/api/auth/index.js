const { APIClient } = require('../api_helper');
const url = require('../url_helper');

const api = new APIClient();

export const getStaffList = (query) => {
    return api.get(url.GET_STAFF_LIST, query);
};

export const getSingleStaff = (id, config) => {
    return api.get(`${url.GET_SINGLE_STAFF}/${id}`, config);
};

export const registerNewStaff = (body, config) => {
    return api.create(url.REGISTER_NEW_STAFF, body, config);
};
