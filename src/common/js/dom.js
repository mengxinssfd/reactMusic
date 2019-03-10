export function addClass(el, className) {
  if (hasClass(el, className)) {
    return;
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
};

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
};

export function getData(el, name, val) {
  const prefix = 'data-';
  if (val) {
    return el.setAttribute(prefix + name, val);
  }
  return el.getAttribute(prefix + name);
};
// ********************************************************************************
let elementStyle = document.createElement('div').style;

let vendor = (() => {
  let transformName = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  };

  for (let key in transformName) {
    if (elementStyle[transformName[key]] !== undefined) {
      return key;
    }
  }
  return false;
})();

/**
 * 判断是什么种类的浏览器并返回拼接后的数据
 * @param style
 * @returns {*}
 */
export function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }

  if (vendor === 'transform') {
    return style;
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
};
// ********************************************************************************
