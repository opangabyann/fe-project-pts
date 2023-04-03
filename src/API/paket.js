import client from "./baseUrl";

export async function GetPaket (keyword) {
    return client.get(`/paket/list?keyword=${keyword}`)
}

export async function TambahPaket (payload) {
    return client.post('/paket/tambah-paket',payload)
}

export async function DeletePaket(id){
    return client.delete(`/paket/delete/${id}`)
}

export async function DetailPaket(id){
    return client.get(`/paket/detail/${id}`)
}

export async function UpdatePaket(id,payload){
    return client.put(`/paket/update/${id}`,payload)
}