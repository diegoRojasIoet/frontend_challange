import { API_MOVIE_ID_URL, OPTIONS } from "./constants.js";

export const get_movie_by_id = async (id) => {
    try {
        const MOVIE_URL = API_MOVIE_ID_URL(id)
        const response = await fetch(MOVIE_URL, OPTIONS);
        const result = await response.text();
        return JSON.parse(result).results;
    } catch (error) {
        console.error(error);
    }
}