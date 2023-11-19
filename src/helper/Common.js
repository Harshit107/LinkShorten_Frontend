import { getTokenFromLocalStorage, initialize } from "./LocalStorage";

export async function isLoggedIn() { 
    return getTokenFromLocalStorage();
}
export async function makeLogin() { 
    initialize();
    window.location.reload();
}