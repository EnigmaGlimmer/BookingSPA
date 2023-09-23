import { DISPLAY_POSTER_SUCCESS, DISPLAY_POSTER_FAILURE } from './actionType';

const INIT_STATE = {
    eventScript: '',
    error: null,
    loading: false,
};

const Event = (state = INIT_STATE, action) => {
    switch (action.type) {
        case DISPLAY_POSTER_SUCCESS:
            return {
                ...state,
                eventScript: action.payload?.data,
            };

        case DISPLAY_POSTER_FAILURE:
            return {
                ...state,
                error: 'Display error failed',
            };

        default:
            return state;
    }
};

export default Event;
