import axios from 'axios';
import qs from 'query-string';
import { Options } from '@/types/global';
import {UserState} from "@/store/modules/user/types";

export interface PolicyRecord {
  id: string;
  number: number;
  name: string;
  contentType: 'img' | 'horizontalVideo' | 'verticalVideo';
  filterType: 'artificial' | 'rules';
  count: number;
  status: 'online' | 'offline';
  createdTime: string;
}

export interface PolicyParams extends Partial<PolicyRecord> {
  competitionName:''
  country:'',
  name:'',
  pageNumber: number;
  pageSize: number;
}

export interface PolicyListRes {
  list: PolicyRecord[];
  total: number;
}


export function queryPolicyList(params: PolicyParams) {
  return axios.get<PolicyListRes>('/api/list/policy', {
    params,
    // paramsSerializer: (obj) => {
    //   return qs.stringify(obj);
    // },
  });
}

export interface ServiceRecord {
  id: number;
  title: string;
  description: string;
  name?: string;
  actionType?: string;
  icon?: string;
  data?: Options[];
  enable?: boolean;
  expires?: boolean;
}
export function queryInspectionList() {
  return axios.get('/api/list/quality-inspection');
}

export function queryTheServiceList() {
  return axios.get('/api/list/the-service');
}

export function queryRulesPresetList() {
  return axios.get('/api/list/rules-preset');
}

export  function addComCategory (data) {
  return axios.post('/api4/competition/addComCategory',data);
}
export  function addComInfo (data) {
  return axios.post('/api4/competition/addComInfo',data);
}
// export function getCompetitioncategorys() {
//   return axios.get('/competition/getComCategorys');
// }
export function getComInfos(){
  return axios.get('/api4/competition/getComInfos')
}
export  function getComNamesByComCategoryId () {
  return axios.get('/api4/competition/getComNamesByComCategoryId');
}
export function uploadImg (data) {
  return axios.post('/api4/file/uploadFiles',data)
}
