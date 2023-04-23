import axios from 'axios';

export function getFriendLinks(params){
    return axios.get('/api5/system/getFriendLinks',params)
}

export function addFriendLink (data) {
    return axios.post('/api5/system/addFriendLink',data)
}
