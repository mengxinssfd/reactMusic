function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 *
 * @param arr
 * @param currentIndex // 该位置的会设置到数组第一个
 * @returns {*[]}
 */
export function shuffle(arr, currentIndex) {
  let randomArr = [...arr];

  // 把currentIndex处的元素删除
  if (currentIndex !== undefined) {
    randomArr.splice(currentIndex, 1);
  }

  // 打乱数组
  for (let i = 0; i < randomArr.length; i++) {
    let random = getRandom(0, i);
    [randomArr[i], randomArr[random]] = [randomArr[random], randomArr[i]];
  }

  // 从原数组中获取currentIndex处的元素设置到数组第一个
  if (currentIndex !== undefined) {
    randomArr.unshift(arr[currentIndex]);
  }
  // randomArr = [...new Set(randomArr)];
  return randomArr;
}

export function Base64() {
  // private property
  let _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  // public method for encoding
  this.encode = function (input) {
    let output = '';
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;
    input = _utf8Encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  };

  // public method for decoding
  this.decode = function (input) {
    let output = '';
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;
    input = input.replace(/[^A-Za-z0-9\\+\\/\\=]/g, '');
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 !== 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 !== 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = _utf8Decode(output);
    return output;
  };

  // private method for UTF-8 encoding
  let _utf8Encode = function (string) {
    string = string.replace(/\r\n/g, '\n');
    let utftext = '';
    for (let n = 0; n < string.length; n++) {
      let c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  };

  // private method for UTF-8 decoding
  let _utf8Decode = function (utftext) {
    let string = '';
    let i = 0;
    let c = 0;
    let c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        let c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  };
}

/**
 *
 * @param func
 * @param delay
 * @returns {Function}
 */
export function debounce(func, delay) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 *
 * @param list
 * @param insert
 * @param insertTo  //
 * @param compare // 为空时使用indexOf
 * @param maxLen  // 设定了最大长度时超过则pop()
 * @returns {{list:[], index: number}}
 */
export function insertToArray(list, insert, insertTo = 0, compare, maxLen) {
  /* // 默认为0
   if (insertTo === undefined) {
     insertTo = 0;
   } */
  let newArr = list.slice();
  // 查找原数组中是否存在要插入的数据
  let index;
  if (!compare) {
    index = list.indexOf(insert);
  } else {
    index = list.findIndex(compare);
  }

  newArr.splice(insertTo, 0, insert);
  // 存在相同的数据，则删除原数组中的数据
  if (index > -1) {
    if (index > insertTo) {
      newArr.splice(index + 1, 1);
      insertTo++;
    } else {
      newArr.splice(index, 1);
    }
  }

  if (maxLen && newArr.length > maxLen) {
    newArr.pop();
  }

  return {list: newArr, index: newArr.indexOf(insert)};
}
