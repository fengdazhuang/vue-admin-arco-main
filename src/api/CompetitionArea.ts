import axios from 'axios';

// export function (){
//     return
// }
export function addComArea(data){
    return axios.post('/api4/competition/addComArea',data)
}
export function addComPosition(data){
    return axios.post('/api4/competition/addComPosition',data)
}

export function deleteComPosition(params){
    return axios.delete('/api4/competition/deleteComPosition',params)
}
export function getComAreas(params){
    return axios.get('/api4/competition/getComAreas',params)
}
export function getComPositions(params){
    return axios.get('/api4/competition/getComPositions',params)
}
