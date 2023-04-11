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

export function getValidateCode() {
  return axios.get<LoginRes>('/api1/admin/getCodeImage');
}
export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info');
}

export function addPlayer(data){
  return axios.post('/api1/player/addPlayer',data)
}

export function deletePlayer(params) {
  return axios.delete('/api1/player/deletePlayer',params)
}
export  function listPlayers(data) {
  return axios.post('/api1/player/listPlayers',data)
}
export  function queryPlayer(data) {
  return axios.post('/api1/player/queryPlayer',data)
}
export  function updatePlayer(data) {
  return axios.put('/api1/player/updatePlayer',data)
}

