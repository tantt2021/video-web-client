import { Http } from "~~/utils/http";

export const uploadVideo = async (body:FormData) => {
    return await Http.post("video/upload",{},{},body);
}

export const getVideo = async (params:object) => {
    let res = await Http.post("video/getOneVideo",params);
    console.log(res);
    return res.data;
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