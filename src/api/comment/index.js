const { APIClient } = require('../api_helper');
const url = require('../url_helper');

const api = new APIClient();

const getCommentList = (pagination) => {
    return api.get(url.GET_COMMENT_LIST);
};

const postComment = (body, config) => {
    return api.create(url.POST_COMMENT, body);
};
