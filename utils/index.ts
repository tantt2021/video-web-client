// export function debounce(func, wait, immediate) {
//     let timeout, args, context, timestamp, result

//     const later = function () {
//         // 据上一次触发时间间隔
//         const last = +new Date() - timestamp

//         // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
//         if (last < wait && last > 0) {
//             timeout = setTimeout(later, wait - last)
//         } else {
//             timeout = null
//             // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
//             if (!immediate) {
//                 result = func.apply(context, args)
//                 if (!timeout) context = args = null
//             }
//         }
//     }

//     return function (...args) {
//         context = this
//         timestamp = +new Date()
//         const callNow = immediate && !timeout
//         // 如果延时不存在，重新设定延时
//         if (!timeout) timeout = setTimeout(later, wait)
//         if (callNow) {
//             result = func.apply(context, args)
//             context = args = null
//         }

//         return result
//     }
// }
export function debounce(event, fn, wait) {
    var timerId = null;
    var flag = true;
    return function () {
        var context = this
        var args = arguments
        clearTimeout(timerId);
        if (flag) {
            fn.apply(context, args);
            flag = false
        }
        timerId = setTimeout(() => { flag = true }, wait)
    }
}

export function throttle(fn, delay) {
    let timer = null

    return function () {
        if (timer) {
            return
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
}

// 格式化时间
export function formatTime(str: number) {
    let minute: number = ~~(str / 60);
    let second: number = ~~(str % 60);
    let min: string = "0";
    let s: string = "0";

    // if (minute / 10 < 0) {
    //     min = `0${minute.toString()}`;
    // }
    // if (second / 10 < 0) {
    //     s = `0${second.toString()}`;
    // }

    return `${minute < 10 ? '0' + minute.toString() : minute} : ${second < 10 ? '0' + second.toString() : second}`;


}