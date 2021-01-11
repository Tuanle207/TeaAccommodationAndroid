import axios  from 'axios';
import { serverApi}  from '../../appsetting';

const accommodationRequest = axios.create({
    baseURL: `${serverApi}/api`
});

export default accommodationRequest;