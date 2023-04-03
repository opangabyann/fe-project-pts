import client from "./baseUrl";

export async function GetUser (keyword,page,pageSize) {
    return client.get(`/user/list?keyword=${keyword}&page=${page}&pageSize=${pageSize}`)
}

export async function TambahUser (payload) {
    return client.post('/user/tambah-user',payload)
}

export async function DeleteUser (id){
    return client.delete(`/user/delete/${id}`)
}


export async function DetailUser(id){
    return client.get(`/user/detail/${id}`)
}

export async function UpdateUser(id,payload){
    return client.put(`/user/update/${id}`,payload)
}