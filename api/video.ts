import { Http } from "~~/utils/http";

export const uploadVideo = async (body:FormData) => {
    return await Http.post("video/upload",{},{},body);
}

export const uploadLargeFileInfo = async (body:FormData) => {
    return await Http.post("video/uploadLargeFileInfo",{},{},body);
}

// 上传大文件
export const uploadLargeFile = async (body:FormData) => {
    return await Http.post("video/uploadLargeFile",{},{},body);
}

export const getVideo = async (params:object) => {
    return await Http.post("video/getOneVideo",params);
}

export const getVideos = async (params:object) => {
    return await Http.post("video/getVideo",params);
}

export const getAllVideos = async () => {
    return await Http.get("video/getAllVideos");
}

export const delVideo = async (params:object) => {
    return await Http.post("video/delVideo",params);
}

export const addVideoViews = async (params:object) => {
    return await Http.post("video/addViews",params);
}

// 获取排行榜
export const getTop = async () => {
    return await Http.get("video/getTop");
}
