import {jsonp} from '../common/js/jsonp';

export function getFileID(vid) {
  let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
  let data = {
    g_tk: 5381,
    uin: 0,
    ct: 23,
    cv: 0,
    format: 'json',
    // callback: 'qmv_jsonp_2',
    data: JSON.stringify({
      'getMvInfo': {
        'module': 'MvService.MvInfoProServer',
        'method': 'GetMvInfoList',
        'param': {'vidlist': [vid]}
      }
    }),
    _: new Date().getTime()
  };
  return jsonp(url, data, {param: 'callback'});
}

export function getMVVkey(fileID) {
  let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
  let data = {
    g_tk: 5381,
    uin: 0,
    ct: 23,
    cv: 0,
    format: 'json',
    // callback: 'qmv_jsonp_3',
    data: JSON.stringify({
      'getMvUrl': {
        'module': 'Mv.MvDownloadUrlServer',
        'method': 'GetMvUrls',
        'param': {'fileid': [fileID], 'filetype': [-1]}
      }
    }),
    _: new Date().getTime()
  };
  return jsonp(url, data, {param: 'callback'});
}
