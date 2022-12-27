import axios from 'axios';

const BASE_URL = 'http://localhost:9000/api';

export const getDiscover = (keyword, genre, weather, mood) => {
    let requestString = `${BASE_URL}/v1/discover?keyword=${keyword}&genre=${genre}&weather=${weather}&mood=${mood}`;
    console.log(`GET request sent to ${requestString}`)
    return axios
        .get(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'GET_DISCOVER_FAIL',
            error,
        }));
};

export const addFavorite = (userID, songID) => {
    let requestString = `${BASE_URL}/v1/addFavorite?userID=${userID}&songID=${songID}`;
    console.log(`POST request sent to ${requestString}`)
    return axios
        .post(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'ADD_FAVORITE_FAIL',
            error,
        }));
};

export const getDeleteFavorite = (userID, songID) => {
    let requestString = `${BASE_URL}/v1/deleteFavorite?userID=${userID}&songID=${songID}`;
    console.log(`DELETE request sent to ${requestString}`)
    return axios
        .delete(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'REMOVE_FAVORITE_FAIL',
            error,
        }));
};

export const canFavorite = (userID, songID) => {
    let requestString = `${BASE_URL}/v1/canFavorite?userID=${userID}&songID=${songID}`;
    console.log(`GET request sent to ${requestString}`)
    return axios
        .get(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'GET_DISCOVER_FAIL',
            error,
        }));
};

export const addFollow = (userID, artistID) => {
    let requestString = `${BASE_URL}/v1/addFollow?userID=${userID}&artistID=${artistID}`;
    console.log(`POST request sent to ${requestString}`)
    return axios
        .post(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'ADD_FOLLOW_FAIL',
            error,
        }));
};

export const getDeleteFollow = (userID, artistID) => {
    let requestString = `${BASE_URL}/v1/deleteFollow?userID=${userID}&artistID=${artistID}`;
    console.log(`DELETE request sent to ${requestString}`)
    return axios
        .delete(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'REMOVE_FOLLOW_FAIL',
            error,
        }));
};

export const canFollow = (userID, artistID) => {
    let requestString = `${BASE_URL}/v1/canFollow?userID=${userID}&artistID=${artistID}`;
    console.log(`GET request sent to ${requestString}`)
    return axios
        .get(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'GET_DISCOVER_FAIL',
            error,
        }));
};

export const getRecommend = (userID, compareID) => {
    let requestString = `${BASE_URL}/v1/recommend?userID=${userID}&compareID=${compareID}`;
    console.log(`GET request sent to ${requestString}`)
    return axios
        .get(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'GET_DISCOVER_FAIL',
            error,
        }));
};

export const getUser = (userID, password) => {
    let requestString = `${BASE_URL}/v1/getUser?userID=${userID}&password=${password}`;
    console.log(`GET request sent to ${requestString}`)
    return axios
        .get(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'GET_DISCOVER_FAIL',
            error,
        }));
};

export const getSongFavorites = (userID) => {
    let requestString = `${BASE_URL}/v1/getSongFavorites?userID=${userID}`;
    console.log(`GET request sent to ${requestString}`)
    return axios
        .get(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'GET_DISCOVER_FAIL',
            error,
        }));
};

export const getArtistFollows = (userID) => {
    let requestString = `${BASE_URL}/v1/getArtistFollows?userID=${userID}`;
    console.log(`GET request sent to ${requestString}`)
    return axios
        .get(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'GET_DISCOVER_FAIL',
            error,
        }));
};

export const getID = () => {
    let requestString = `${BASE_URL}/v1/getID`;
    console.log(`GET request sent to ${requestString}`)
    return axios
        .get(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'GET_DISCOVER_FAIL',
            error,
        }));
};

export const validUser = (userID, password) => {
    let requestString = `${BASE_URL}/v1/validUser?userID=${userID}&password=${password}`;
    console.log(`GET request sent to ${requestString}`)
    return axios
        .get(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'GET_DISCOVER_FAIL',
            error,
        }));
};

export const updatePassword = (userID, password) => {
    let requestString = `${BASE_URL}/v1/updatePassword?userID=${userID}&password=${password}`;
    console.log(`PUT request sent to ${requestString}`)
    return axios
        .put(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'PUT_PASSWORD_FAIL',
            error,
        }));
};

export const getCreateAccount = (userID, password) => {
    let requestString = `${BASE_URL}/v1/createAccount?userID=${userID}&password=${password}`;
    console.log(`POST request sent to ${requestString}`)
    return axios
        .post(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'GET_DISCOVER_FAIL',
            error,
        }));
};

export const getDaily = () => {
    let requestString = `${BASE_URL}/v1/getDaily`;
    console.log(`GET request sent to ${requestString}`)
    return axios
        .get(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'GET_DISCOVER_FAIL',
            error,
        }));
};


export const getProbabilityDistri = (userID) => {
    let requestString = `${BASE_URL}/v1/probabilityDistri?userID=${userID}`;
    console.log(`GET request sent to ${requestString}`)
    return axios
        .get(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'GET_DISCOVER_FAIL',
            error,
        }));
 };
 
 export const getStat = (userID) => {
    let requestString = `${BASE_URL}/v1/getStat?userID=${userID}`;
    console.log(`GET request sent to ${requestString}`)
    return axios
        .get(requestString, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'GET_DISCOVER_FAIL',
            error,
        }));
};