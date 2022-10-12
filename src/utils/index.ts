export function getCookie(cName: string) {
    if (document.cookie.length > 0) {
        let cStart = document.cookie.indexOf(cName + "=");
        if (cStart !== -1) {
            cStart = cStart + cName.length + 1;
            let cEnd = document.cookie.indexOf(";", cStart);
            if (cEnd === -1) cEnd = document.cookie.length;
            return decodeURIComponent(document.cookie.substring(cStart, cEnd));
        }
    }
    return "";
}
//    config.headers!['X-CSRFToken'] = getCookie('csrftoken');

//Cookie 库
//const csrftoken = Cookies.get('csrftoken');

export function timestampToTime(timestamp: Date | any, dayMinSecFlag: boolean) {
    const date = new Date(timestamp);
    const Y = date.getFullYear() + "-";
    const M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
    const D = date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
    const h = date.getHours() < 10 ? "0" + date.getHours() + ":" : date.getHours() + ":";
    const m = date.getMinutes() < 10 ? "0" + date.getMinutes() + ":" : date.getMinutes() + ":";
    const s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    if (!dayMinSecFlag) {
        return Y + M + D;
    }
    return Y + M + D + h + m + s;
}
