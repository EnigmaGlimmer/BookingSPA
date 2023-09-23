import { DISPLAY_POSTER, DISPLAY_POSTER_FAILURE, DISPLAY_POSTER_SUCCESS } from './actionType';

export const displayPoster = () => ({
    type: DISPLAY_POSTER,
});

type PosterPayload = { data: string };

export const displayPosterSuccess = (payload: PosterPayload) => ({
    type: DISPLAY_POSTER_SUCCESS,
    payload,
});

export const displayPosterError = (error: string) => ({
    type: DISPLAY_POSTER_FAILURE,
    error,
});
