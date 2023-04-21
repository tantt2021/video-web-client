import {Http} from "@/utils/http";

// 获取动态
export const getDynamic = async (params:object) => {
    return await Http.post("dynamic/getDynamic", params);
}

// 发表动态
export const addDynamic = async (body:FormData) => {
    return await Http.post("dynamic/addDynamic",{},{},body);
}