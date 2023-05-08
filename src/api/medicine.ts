import axios from 'axios';

export function pageMedicine(params){
    return axios.get('/api7/medicine/pageMedicine',params)
}
export function addMedicine(data){
    return axios.post('/api7/medicine/addMedicine',data)
}
export function replenishInventory(data){
    return axios.put('/api7/medicine/replenishInventory',data)
}
export function queryMedicines(params){
    return axios.get('/api7/medicine/queryMedicines',params)
}
