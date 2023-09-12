import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_CATEGORY_LIST,
    POST_CATEGORY_SUCCESS,
    POST_CATEGORY_FAILED,
} from './actionType';

const INIT_STATE = {
    category: [],
    error: null,
    loading: false,
};

const Category = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_CATEGORY_LIST:
                    return {
                        ...state,
                        category: action.payload.data,
                    };
                default:
                    return state;
            }

        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_CATEGORY_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                default:
                    return state;
            }

        case POST_CATEGORY_SUCCESS:
            switch (action.payload.actionType) {
                case GET_CATEGORY_LIST:
                    return {
                        ...state,
                        category: action.payload.data,
                    };

                default:
                    return state;
            }

        case POST_CATEGORY_FAILED:
            return {
                ...state,
                error: action.payload.error,
            };

        default:
            return state;
    }
};

export default Category;
