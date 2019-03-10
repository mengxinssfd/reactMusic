import originJsonp from 'jsonp';

/**
 *
 * @param url
 * @param data
 * @param option
 * @returns {Promise<any>}
 */
export function jsonp(url, data, option) {
  url += url.indexOf('?') > 0 ? '&' : '?';
  url += paramJoin(data);
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

/**
 *
 * @param data
 * @returns {string}
 */
export function paramJoin(data) {
  let url = '';
  for (let key in data) {
    url += `&${key}=${encodeURIComponent(data[key])}`;
  }
  return url ? url.substring(1) : '';
}
