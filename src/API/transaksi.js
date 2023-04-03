import client from "./baseUrl";

export async function GetTransaksi (){
    return client.get('/transaksi/list')
}

export async function TambahTransaksi(payload){
    return client.post('/transaksi/tambah-transaksi',payload)
}

export async function DeleteTransaksi(id){
    return client.delete(`/transaksi/delete/${id}`)
}
export async function DetailTransaksi(id){
    return client.get(`/transaksi/detail/${id}`)
}

export async function UpdateTransaksi(id,payload){
    return client.put(`/transaksi/update/${id}`,payload)
}

export async function downloadLaporan() {
    return client.get("/laporan/download", { responseType: "arraybuffer" });
  }