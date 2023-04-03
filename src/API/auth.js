import client, { syncToken } from "./baseUrl";


export async function LoginProsses(payload){
    return client.post('/login',payload)
}

export function authMeProcess() {
    syncToken();
    return client.get("/authMe");
  }