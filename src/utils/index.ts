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
