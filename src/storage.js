
export function get(key) {
    let value = window.localStorage.getItem(key);
    if (value) {
        return JSON.parse(value);
    }
    return false;
}

export function set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}
