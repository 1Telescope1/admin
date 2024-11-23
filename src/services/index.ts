import { request } from '../utils/request';
import home from './home';

export { home };

export const reqGetActivityList = (data) => request('/api/v1/activity/list', 'POST', data)

export const reqDeleteActivity = (id) => request(`/api/v1/activity/delete/activity`, 'GET', { id })

export const reqChangeAcitivity = (data) => request('/api/v1/activity/modify/activity', 'POST', data)