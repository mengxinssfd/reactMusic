/**
 *
 * @param method
 * @param url
 * @param params
 * @param filter
 * @param callback
 */
export function ajax(method, url, params, filter, callback) {
  // eslint-disable-next-line
  let xhr = new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP') || new ActiveXObject('Msxml2.XMLHTTP');
  let err = false;
  if (!xhr) return;

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200 || xhr.status === 304) {
        let data = xhr.response;
        // 转发后加了层壳{errno:0,data:realData}
        data = JSON.parse(data).data;
        // 清洗数据，把callback去了转成json格式
        data = JSON.parse(filter ? filter(data) : data);
        callback(err, data);
      } else {
        err = true;
        callback(err, {});
      }
    }
  };
  xhr.open(method, url);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(params);
}

/**
 * 过滤
 * @param str
 * @returns
 */
export function filter(str) {
  if (typeof str === 'object') return JSON.stringify(str);
  return str.substring(str.indexOf('{'), str.lastIndexOf('}') + 1);
}
