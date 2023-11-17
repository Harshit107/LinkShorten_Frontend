import { getTokenFromLocalStorage, initialize } from "./LocalStorage";

export async function isLoggedIn() { 
    console.log("Token",getTokenFromLocalStorage());
    return getTokenFromLocalStorage();
}
export async function makeLogin() { 
    console.log("Login Token",getTokenFromLocalStorage());
    initialize();
    window.location.reload();
}