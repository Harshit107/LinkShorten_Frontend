import { CHECK_LOGIN } from "../config";
import { getTokenFromLocalStorage, initialize } from "./LocalStorage";
const moment = require("moment");

export async function isLoggedIn() {
  const token = getTokenFromLocalStorage();
  if (!token) return false;

  try {
    const res = await fetch(CHECK_LOGIN, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return res.ok;
  } catch (err) {
    return false;
  }
}

export async function makeLogin() {
  initialize();
  window.location.reload();
}

export function formatMongoTimestamp(createdAtTimestamp) {
  if (!createdAtTimestamp) return "—";
  return moment(createdAtTimestamp).format("DD-MM-YYYY - ( HH:mm )");
}