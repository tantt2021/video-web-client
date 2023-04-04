import { Http } from "~~/utils/http";

export const editInformation = async (params:Object) => {
    return await Http.post("user/editInformation",params);
}

export const getUserPublicInfo = async (params:Object) => {
    return await Http.post("user/getUserPublicInfo",params);
}