import request from "@/utils/request";
const urlPath = '/video/';


export function getVideo() {
    return request({
        url: `${urlPath}`,
        method: 'get',
    })
}