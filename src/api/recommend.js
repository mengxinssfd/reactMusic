// import {jsonp, paramJoin} from '../common/js/jsonp';
import {jsonp} from '../common/js/jsonp';
import {commonParams, options} from './config';
// import {ajax} from '../common/js/ajax';
// import {useMyServer} from './song';
import {useAxios} from './song';

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  });
  return jsonp(url, data, options);
}

/**
 *
 * @returns {Promise<any>}
 */
export function getDiscList(start, end) {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
  let opt = {
    picmid: 1,
    rnd: Math.random(),
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    jsonpCallback: 'callback',
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    /* sin: 0,
    ein: 29, */
    sin: start,
    ein: end,
    format: 'json'
  };
  let referer = 'https://y.qq.com/n/yqq';
  const data = Object.assign({}, commonParams, opt);
  // let params = 'url=' + encodeURIComponent(url + '?' + paramJoin(data)) + '&referer=' + encodeURIComponent('http://y.qq.com');

  /* let promise = new Promise((resolve, reject) => {
    // ajax('post', 'http://119.29.120.41/api/getSomething', params, null, (err, data) => {
    /!*ajax('post', config.url, params, null, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });*!/

  });
  // promise.then((res) => {
  //   console.log(res);
  // });
  // return jsonp(url, data, options);
  return promise; */
  return useAxios({data, url, referer});
}

export function getRecommendPlayListDetail(id) {
  let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
  let referer = 'https://y.qq.com/n/yqq/playsquare/' + id + '.html';
  let data = {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid: id,
    g_tk: 5381,
    jsonpCallback: 'callback',
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  };
  return useAxios({url, data, referer});
  // let params = 'url=' + encodeURIComponent(url + '?' + paramJoin(data)) + '&referer=' + encodeURIComponent(referer);
  // return useMyServer(params);
}
