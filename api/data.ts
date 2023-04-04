import { Http } from "~~/utils/http";

// 获取关注列表
export const getFollowing = async (params:any) => {
    return await Http.post('following/getFollowing',params);
}
// 获取粉丝列表
export const getFans = async (params:any) => {
    return await Http.post('fans/getFans',params);
}

// 收藏夹
export const findStar = async (params:any) => {
    return await Http.post("star/findStar",params);
}

// 取消收藏
export const cancelStar = async (params:any) => {
    return await Http.post("star/cancelStar",params);
}