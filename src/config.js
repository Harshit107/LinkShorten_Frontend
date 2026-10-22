import DOMAINS from "./config/domain";

const getApiBaseUrl = () => {
  let apiUrl = process.env.REACT_APP_API_URL;
  if (apiUrl && apiUrl.trim()) {
    let cleanUrl = apiUrl.trim();
    cleanUrl = cleanUrl.replace(/^https?:\/\/+/i, "https://");
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = `https://${cleanUrl}`;
    }
    return cleanUrl.endsWith("/") ? cleanUrl : `${cleanUrl}/`;
  }
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return "http://localhost:3000/";
  }
  let fallback = DOMAINS.LINK_SHORTEN.API || "https://trimurl-api.harshit107.online";
  fallback = fallback.replace(/^https?:\/\/+/i, "https://");
  if (!/^https?:\/\//i.test(fallback)) {
    fallback = `https://${fallback}`;
  }
  return fallback.endsWith("/") ? fallback : `${fallback}/`;
};

export const API_BASE_URL = getApiBaseUrl();

export const defaultSetting = {
  name: "TrimURL",
  domain: API_BASE_URL,
  supportedDomains: ["trimurl.harshit107.online", "trimurl.online", DOMAINS.ROOT, "localhost:3000"],
  supportEmail: [DOMAINS.EMAIL.CONTACT_EMAIL],
  replyEmail: [DOMAINS.EMAIL.SUPPORT_EMAIL],
};

// API Endpoints (Standardized v1 REST Routes)
export const CREATE_LINK_API = `${API_BASE_URL}api/v1/links`;
export const GET_ALL_LINK_API = `${API_BASE_URL}api/v1/links`;
export const CHECK_LOGIN = `${API_BASE_URL}api/v1/auth/dashboard`;
export const USER_AUTH = `${API_BASE_URL}api/v1/auth/login`;
export const USER_REGISTER = `${API_BASE_URL}api/v1/auth/register`;
export const PROFILE_API = `${API_BASE_URL}api/v1/auth/profile`;
export const LOGOUT_API = `${API_BASE_URL}api/v1/auth/logout`;
export const FORGET_PASSWORD_API = `${API_BASE_URL}api/v1/auth/forget/password`;
export const UPDATE_PASSWORD_API = `${API_BASE_URL}api/v1/auth/update/password`;

export { DOMAINS };
