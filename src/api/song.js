import {jsonp, paramJoin} from '../common/js/jsonp';
import {ajax, filter} from '../common/js/ajax';
import {config} from './config';
import axios from 'axios';

export function getVkey(mid) {
  let url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';
  let data = {
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 0,
    songmid: mid,
    filename: 'C400' + mid + '.m4a',
    guid: 4714956536
  };

  let options = {
    param: 'callback'
  };
  return jsonp(url, data, options);
}

export function vkeyFilter(mid) {
  let vkey = '';
  getVkey(mid).then((res) => {
    vkey = res.data.items[0].vkey;
  });
  return vkey;
}

export function getLrc(mid) {
  let url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
  const referer = 'https://y.qq.com/portal/player.html';
  let data = {
    pcachetime: 1523631058849,
    songmid: mid,
    g_tk: 5381,
    jsonpCallback: 'callback',
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  };

  // let params = 'url=' + encodeURIComponent(url + '?' + paramJoin(data)) + '&referer=' + encodeURIComponent(referer);
  // return useMyServer(params);

  return useAxios({url, data, referer});
}

// eslint-disable-next-line
export function useMyServer(params) {
  return new Promise((resolve, reject) => {
    // ajax('post', 'http://119.29.120.41/api/getSomething', params, filter, (err, data) => {
    ajax('post', config.url, params, filter, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

export function useAxios({data, url, referer}) {
  url = url + '?' + paramJoin(data);
  // return axios.get('/api/getSomething', {
  return axios.get(config.url, {
    params: {
      url,
      // data,
      referer
    }
  }).then((res) => {
    let data = JSON.parse(filter(res.data));
    return Promise.resolve(data);
  });
}
