import axios from 'axios';


export function pagePreVolunteers(params){
    return axios.get('/api3/volunteer/pagePreVolunteers',params)
}
export function pageVolunteers(params){
    return axios.get('/api3/volunteer/pageVolunteers',params)
}

export function register(data){
    return axios.post('/api3/volunteer/register',data)
}

export function sendCode(data) {
    return axios.post('/api3/volunteer/sendCode',data)
}

export function doReview(data){
    return axios.put('/api3/volunteer/doReview',data)
}
export function resetRisk(data){
    return axios.put('/api3/volunteer/resetRisk',data)
}
export function modifyInfo(data){
    return axios.put('/api3/volunteer/modifyInfo',data)
}
export function modifyPassword(data){
    return axios.put('/api3/volunteer/modifyPassword',data)
}
export function forgetPassword(data){
    return axios.put('/api3/volunteer/forgetPassword',data)
}
export function logout(params){
    return axios.get('/api3/volunteer/logout',params)
}
export function getVolDirections(params){
    return axios.get('/api3/volunteer/getVolDirections',params)
}
export function pageVolPositions(params) {
    return axios.get('/api3/volunteer/pageVolPositions',params)
}
export function chooseVolType(data,params){
    return axios.put('/api3/volunteer/chooseVolType',data,params)
}
export function queryVolunteer(params){
    return axios.get('/api3/volunteer/queryVolunteer',params)
}

