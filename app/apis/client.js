import axios  from 'axios';
import {SERVER_URL} from '@env';

const accommodationRequest = axios.create({
    baseURL: `${SERVER_URL}/api/`
});

export default accommodationRequest;