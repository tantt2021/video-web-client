import { Http } from "~~/utils/http";

export const getMessage = async (params:object) => {
     let {data} = await Http.post("message/getMessage",params);
     return data;

}