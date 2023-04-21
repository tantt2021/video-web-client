import { Http } from "~~/utils/http";

// 获取某个用户的全部消息
export const getMessage = async (params:object) => {
     let {data} = await Http.post("message/getMessage",params);
     return data;
}

export const getChat = async (params:object) => {
     let {data} = await Http.post("chat/getChatContent",params);
     return data;
}
