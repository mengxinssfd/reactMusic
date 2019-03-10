import {ajax} from '../common/js/ajax';
import {paramJoin} from '../common/js/jsonp';

export function getMv() {
  let url = 'https://vv.video.qq.com/getvinfo';
  let referer = 'https://imgcache.qq.com';
  let data = {
    ran: Math.random(),
    defaultfmt: 'sd',
    sphls: 1,
    ehost: 'https://y.qq.com/n/yqq/mv/v/y00258qfqnp.html',
    drm: 8,
    fp2p: 1,
    cKey: 'RQvLK9-qyfwYwcNGrK034xhHCph62nvl797pzPJzPYriNkNKjRzRzILqfiAG0MwyxRu3b_HdkaSEIO2bmHgBcSLiovK5phC7YIXLtZbIiL6u2XvLErRohIAKr1ECiAbdGEJmiUWBaEFM230C5TR4rw_gvqtSo9UC5VewKbdhWQLQ2J3gpPRrK9S-dDIxccgj1Sf3Y0yuILo-k3MWsgyvlq09y1GETvfC__A_5CQxZbgcDYoIXHoZu5cXVyBMGs-wgJuMOueHVZZJGobAuD4cHcY3XdbySZVc6Oas4OwKT61FGsmzFepkEo0HBwcHBwcHay-KKg',
    otype: 'json',
    vid: 'y00258qfqnp',
    unid: '7198795f420811e89d19a042d42c850a',
    defsrc: 2,
    sphttps: 1,
    linkver: 2,
    guid: 'D38474E213D7F0AA5B355B2D6E943AB2',
    fhdswitch: 0,
    refer: 'https://y.qq.com/portal/mv_lib.html',
    spwm: 1,
    appver: '3.2.38.462',
    platform: 70202,
    charge: 0,
    encryptVer: 5.4,
    speed: 542,
    defn: 'sd',
    flowid: 'C6A1502990FBB1E0F2DFAD02221C45C0718FE10A_70202',
    newplatform: 70202,
    utype: -1,
    pid: 'C6A1502990FBB1E0F2DFAD02221C45C0718FE10A',
    dtype: 3,
    defnpayver: 0
  };
  let params = 'url=' + encodeURIComponent(url + '?' + paramJoin(data)) + '&referer=' + encodeURIComponent(referer);
  return new Promise((resolve, reject) => {
    ajax('post', 'http://119.29.120.41/api/getSomething', params, null, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}
