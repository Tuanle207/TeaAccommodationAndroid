import axios from 'axios';

const addressRequest = axios.create({
    baseURL: 'https://api.mysupership.vn/v1/partner/areas'
});

export default addressRequest;