import { Http } from "@/utils/http"

// 获取所有历史记录
export const getHistorys = async (params?:object) => {
    let res = await Http.post("history/getAll",params);
    return res.data;
}

// 添加历史记录
export const addHistory  = async (params?:object) => {
    return await Http.post("history/addHistory",params);
}

// 删除历史记录
export const delHistory = async (params?:object) => {
    return await Http.post("history/delHistory",params);
}