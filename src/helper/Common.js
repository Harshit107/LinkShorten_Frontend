import { CHECK_LOGIN } from "../config";
import { getTokenFromLocalStorage, initialize } from "./LocalStorage";

export async function isLoggedIn() {
    const res = await fetch(CHECK_LOGIN, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getTokenFromLocalStorage()
        },
    })
    console.log(!(!res.ok || res.status === 401));
    return !(!res.ok || res.status === 401)
   
}
export async function makeLogin() {
    initialize();
    window.location.reload();
}