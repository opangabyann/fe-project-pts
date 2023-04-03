import client from "./baseUrl";

export async function GetDetailTransaksi (id){
    return client.get(`/detail/transaksi/${id}`)
}
