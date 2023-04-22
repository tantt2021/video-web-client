import { Http } from "~~/utils/http";

// 获取关注列表
export const getFollowing = async (params:any) => {
    return await Http.post('following/getFollowing',params);
}

// 关注操作
export const handleFollow = async (params:object) => {
    return await Http.post("following/handleFollow",params);
}

// 获取粉丝列表
export const getFans = async (params:any) => {
    return await Http.post('fans/getFans',params);
}

// 收藏夹
export const findStar = async (params:any) => {
    let res = await Http.post("star/findStar",params);
    let {data} = res;
    console.log(data,"data");
    
    return data;
}

// 添加收藏
export const addStar = async (params:any) => {
    return await Http.post("star/addStar",params);
}

// 取消收藏
export const cancelStar = async (params:any) => {
    return await Http.post("star/cancelStar",params);
}

// 查询是否已收藏
export const isStar = async (params:object) => {
    return await Http.post("star/isStar",params);
}

// 添加点赞/取消点赞
export const toggleLike = async (params:object) => {
    return await Http.post("like/toggleLike",params);
}


// 查询点赞记录
export const isLike = async (params:object) => {
    return await Http.post("like/isLike",params);
}

// 获取评论
export const getComment = async (params:object) => {
    return await Http.post("comment/getComment",params);
}

// 发表评论
export const addComment = async (params:object) => {
    return await Http.post("comment/addComment",params);
}