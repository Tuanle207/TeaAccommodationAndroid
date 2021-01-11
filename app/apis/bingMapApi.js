import axios from 'axios';

export const bingMapApiKey = 'Ap2rAZTQv3mCqJbPxwIbJRhxhLjLWduk9rpCfxp8iO5OGHazrY8vBEewDHWWwwCl';
export const bingMapApi = axios.create({
    baseURL: `http://dev.virtualearth.net/REST/v1`
});