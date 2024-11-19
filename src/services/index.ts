import { request } from '../utils/request';
import home from './home';

export { home };

export const reqGetAllVote = (data) => request('/api/v1/activity/list','POST', data)
