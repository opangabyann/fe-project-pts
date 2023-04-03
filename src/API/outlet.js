import client from "./baseUrl";

export async function TambahOutlet(payload){
    return client.post('/outlet/tambah-outlet',payload)
}

export async function DeleteOutlet(id){
    return client.delete(`/outlet/delete/${id}`)
}
export async function GetOutlet(keyword,page,pageSize){
    return client.get(`/outlet/list?keyword=${keyword}&page=${page}&pageSize=${pageSize}`)
}

export async function DetailOutlet(id){
    return client.get(`/outlet/detail/${id}`)
}

export async function UpdateOutlet(id,payload){
    return client.put(`/outlet/update/${id}`,payload)
}