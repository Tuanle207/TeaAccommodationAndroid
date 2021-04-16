import axios  from 'axios';
import { serverApi}  from '../../appsetting';
import { store } from '../store';

const accommodationRequest = axios.create({
    baseURL: `${serverApi}/api`
});

accommodationRequest.interceptors.request.use((req) => {
  const token = store.getState().user.token;
  req.headers = {...req.headers, Authorization: `Bearer ${token}`}
  return req;
});

export default accommodationRequest;