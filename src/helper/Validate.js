import validator from 'validator';

export function isValidUrl(url) {
  return validator.isURL(url);
}