import axios from 'axios';

export function pageResult(params){
    return axios.get('/api7/DopTest/pageResult',params)
}
export function pageExamination(params){
    return axios.get('/api7/DopTest/pageExamination',params)
}
export function addDopTest(data){
    return axios.post('/api7/DopTest/addDopTest',data)
}
export function submitResult(data){
    return axios.put('/api7/DopTest/submitResult',data)
}
