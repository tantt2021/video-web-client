import { Http } from "@/utils/http"

// 登录
export const getLogin = async (params?: object) => {

    return await Http.post("user/check", params);

}
// 注册
export const getRegister = async (params?: object) => {
    return await Http.post("user/add", params);
}


// 验证码登录,获取验证码
export const getLoginByCode = async (params?: object) => {
    return await Http.post("email/sendCode", params);
}

// 验证码登录，存入数据库
export const getLoginByEmail = async (params: object) => {
    return await Http.post("user/add",params);
}