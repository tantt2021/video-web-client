import { Http } from "@/utils/http"

// 登录
export const getLogin = async (params?: object) => {

    return await Http.post("user/check", params);

}
// 注册
export const getRegister = async (params?: object) => {
    return await Http.post("user/add", params);
}
