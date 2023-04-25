import axios from 'axios';

export function getFriendLinks(params){
    return axios.get('/api5/system/getFriendLinks',params)
}

export function addFriendLink (data) {
    return axios.post('/api5/system/addFriendLink',data)
}
export function modifyFriendLinkStatus(data) {
    return axios.put('/api5/system/modifyFriendLinkStatus',data)
}
export function modifyFriendLink(data){
    return axios.put('/api5/system/modifyFriendLink',data)
}
