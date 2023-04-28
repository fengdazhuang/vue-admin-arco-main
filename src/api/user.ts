import axios from 'axios';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/api1/admin/login', data);
}
export function loginVolunteer (data) {
  return axios.post('/api3/volunteer/login',data)
}
export function getValidateCode() {
  return axios.get<LoginRes>('/api1/admin/getCodeImage');
}
// export function logout() {
//   return axios.post<LoginRes>('/api/user/logout');
// }

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info');
}

// 人脸识别
export function recognizeFace(data){
  return axios.post('/api1/player/faceSearch',data)
}

// 运动员
export function addPlayer(data){
  return axios.post('/api1/player/addPlayer',data)
}

export function deletePlayer(params) {
  return axios.delete('/api1/player/deletePlayer',params)
}
export  function listPlayers(params) {
  return axios.get('/api1/player/listPlayers',params)
}
export  function queryPlayer(params) {
  return axios.get('/api1/player/queryPlayer',params)
}
export  function updatePlayer(data) {
  return axios.put('/api1/player/updatePlayer',data)
}

// 裁判
export function addJudge(data){
  return axios.post('/api1/judge/addJudge',data)
}

export function deleteJudge(params) {
  return axios.delete('/api1/judge/deleteJudge',params)
}
export  function listJudges(params) {
  return axios.get('/api1/judge/listJudges',params)
}
// export  function queryPlayer(params) {
//   return axios.get('/api1/player/queryPlayer',params)
// }
export  function updateJudge(data) {
  return axios.put('/api1/judge/updateJudge',data)
}

// 管理员
export function getInfo(params){
  return axios.get('/api1/admin/getInfo',params)
}
export function modifyInfo(data){
  return axios.put('/api1/admin/modifyInfo',data)
}
export function addAdmin(data) {
  return axios.post('/api1/admin/addAdmin',data)
}

export function listAdmins(params) {
  return axios.get('/api1/admin/listAdmins',params)
}

export function logout(data) {
  return axios.post('/api1/admin/logout',data)
}
export function queryAdmin (params) {
  return axios.get('/api1/admin/queryAdmin',params)
}
export function resetPassword (data) {
  return axios.put('/api1/admin/resetPassword',data)
}
export function updateStatus (data) {
  return axios.put('/api1/admin/updateStatus',data)
}

// 文章发布
export function addNews(data) {
  return axios.post('/api2/news/addNews',data)
}

export function queryNews(params) {
  return axios.get('/api2/news/queryNews',params)
}
export function deleteNews(params) {
  return axios.delete('/api2/news/deleteNews',params)
}
export function withdraw(data,params) {
  return axios.put('/api2/news/withdraw',data,params)
}

export function update(data) {
  return axios.put('/api2/news/update',data)
}
export function fetchList (data) {
  return axios.get('https://www.fastmock.site/mock/e85283acd24926300e4c1ced32faffa5/weixin/api/order',data)
}
export function ReadNews(params) {
  return axios.get('/api2/news/ReadNews',params)
}
