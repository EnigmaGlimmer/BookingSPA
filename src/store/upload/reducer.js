import { API_RESPONSE_SUCCESS, API_RESPONSE_ERROR, GET_ASSET_LIST } from './actionType';

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

        default:
            return state;
    }
};

export default Uploads;
