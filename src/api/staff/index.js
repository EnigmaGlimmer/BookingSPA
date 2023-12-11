const { APIClient } = require('../api_helper');
const url = require('../url_helper');

const api = new APIClient();

export const addWorkingHour = (body, config) => {
    return api.create(url.ADD_NEW_WORKING_HOUR, body, config);
};

export const getWorkingHourList = (query, config) => {
    return api.get(url.GET_WORKING_HOUR_LIST, query, config);
};

export const assignStaffToService = (body, config) => {
    return api.create(url.ASSIGN_STAFF_TO_SERVICE, body, config);
};
