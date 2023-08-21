import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_ASSET_LIST,
    POST_ASSET_SUCCESS,
    POST_ASSET_FAILED,
    PUT_ASSET_SUCCESS,
    PUT_ASSET_FAILED,
    DELETE_ASSET_SUCCESS,
    DELETE_ASSET_FAILED,
} from './actionType';

const INIT_STATE = {
    uploads: [],
    pages: [],
    numberPerPage: 5,
    error: {},
};

const Uploads = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_ASSET_LIST:
                    return {
                        ...state,
                        uploads: [...state.uploads, ...action.payload],
                    };

                default:
                    return state;
            }

        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_ASSET_LIST:
                    return {
                        ...state,
                        error: action.payload,
                    };

                default:
                    return state;
            }

        case POST_ASSET_SUCCESS:
            return {
                ...state,
                uploads: [...state.uploads, action.payload],
            };

        case POST_ASSET_FAILED:
            return {
                ...state,
                error: action.payload,
            };

        case PUT_ASSET_SUCCESS:
            return {
                ...state,
                uploads: action.payload,
            };

        case PUT_ASSET_FAILED:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default Uploads;
