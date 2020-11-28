import axios  from 'axios';
import {SERVER_URL} from '@env';

console.log(SERVER_URL);

const accommodationRequest = axios.create({
    baseURL: `${SERVER_URL}/api`
});

export default accommodationRequest;