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
