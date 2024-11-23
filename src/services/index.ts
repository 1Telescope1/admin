import { request } from '../utils/request';
import home from './home';

export { home };

export const reqGetActivityList = (data) => request('/api/v1/activity/list', 'POST', data)

export const reqDeleteActivity = (id) => request(`/api/v1/activity/delete/activity`, 'GET', { id }, { id })

export const reqChangeAcitivity = (data) => request('/api/v1/activity/modify/activity', 'POST', data)

export const reqUserList = (data) => request(`/api/v1/users/query`, 'POST', data, data)

export const reqBanUser = (id) => request('/api/v1/users/ban', 'GET', { id }, { id })

export const reqUnBanUser = (id) => request('/api/v1/users/unBan', 'GET', { id }, { id })

export const reqAcitivityUser = (id) => request('/api/v1/activity/allvote', 'GET', { id }, { id })
