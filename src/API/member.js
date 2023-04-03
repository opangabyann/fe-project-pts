import client from "./baseUrl";

export async function GetMember(keyword,page,pageSize){
    return client.get(`/member/list?keyword=${keyword}&page=${page}&pageSize=${pageSize}`)
}

export async function TambahMember(payload){
    return client.post('/member/tambah-member',payload)
}

export async function DeleteMember(id){
    return client.delete(`/member/delete/${id}`)
}

export async function DetailMember(id){
    return client.get(`/member/detail/${id}`)
}

export async function UpdateMember(id,payload){
    return client.put(`/member/update/${id}`,payload)
}