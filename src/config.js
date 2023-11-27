export const defaultSetting = {
  name: "TrimURL",
  domain: "https://trimURL.online/",
  supportedDomains: ["TrimUrl.online"],
  supportEmail: ["contact@trimurl.online"],
  replyEmail: ["support@trimurl.online"],
};

const DEV_URL = "http://localhost:3333/";
// const PROD_URL = 'https://trimurl.online/'

const url = DEV_URL;

export const CREATE_LINK_API = url + "user";
export const GET_ALL_LINK_API = url + "user";
export const CHECK_LOGIN = url + "accounts/dashboard";
export const USER_AUTH = url + "accounts/login";
export const USER_REGISTER = url + "accounts/register";
