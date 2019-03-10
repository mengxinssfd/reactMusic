export function saveToLocal(key, value) {
  window.localStorage[key] = JSON.stringify(value);
}

export function readFromLocal(key, def) {
  let value = window.localStorage[key];
  if (!value) return def;
  return JSON.parse(value);
}
