//时间工具 2019年03月07日14:12:34 gebaoning
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    }
    let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + "";
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? str : padLeftZero(str)
            );
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return ("00" + str).substr(str.length);
}

// 时间转换 2018-10-10-10:47:12	 2019年03月07日14:24:44 gbn
export function dateFormat(time) {
    if (time === undefined) {
        return "";
    }
    if (time === 0 || time == null) {
        return "";
    }
    let dateMat = new Date(time);
    let year = dateMat.getFullYear();
    let month = dateMat.getMonth() + 1;
    let day = dateMat.getDate();
    let hh = dateMat.getHours();
    let mm = dateMat.getMinutes();
    let ss = dateMat.getSeconds();
    let timeFormat = year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
    //console.log('%c OBJLOG dateutil.js time:', 'color:#0f0;', time, timeFormat);
    return timeFormat;
}